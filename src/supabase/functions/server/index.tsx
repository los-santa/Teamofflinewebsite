import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-7d6c9568/health", (c) => {
  return c.json({ status: "ok" });
});

// Get icon image URL
app.get("/make-server-7d6c9568/icon", async (c) => {
  try {
    // List all buckets to find the one containing icon.png
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('Error listing buckets:', bucketsError);
      return c.json({ error: 'Failed to list buckets', details: bucketsError.message }, 500);
    }

    // Try to find icon.png in each bucket
    for (const bucket of buckets || []) {
      const { data: files, error: listError } = await supabase.storage
        .from(bucket.name)
        .list('', { limit: 100 });

      if (!listError && files) {
        const iconFile = files.find(file => file.name === 'icon.png');
        if (iconFile) {
          // Create signed URL valid for 1 hour
          const { data: signedUrlData, error: urlError } = await supabase.storage
            .from(bucket.name)
            .createSignedUrl('icon.png', 3600);

          if (urlError) {
            console.log('Error creating signed URL:', urlError);
            return c.json({ error: 'Failed to create signed URL', details: urlError.message }, 500);
          }

          return c.json({ url: signedUrlData.signedUrl });
        }
      }
    }

    return c.json({ error: 'icon.png not found in any bucket' }, 404);
  } catch (error) {
    console.log('Server error while fetching icon:', error);
    return c.json({ error: 'Internal server error', details: String(error) }, 500);
  }
});

// Get download files (DMG and EXE)
app.get("/make-server-7d6c9568/downloads", async (c) => {
  try {
    // List all buckets to find download files
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('Error listing buckets:', bucketsError);
      return c.json({ error: 'Failed to list buckets', details: bucketsError.message }, 500);
    }

    let dmgUrl = null;
    let exeUrl = null;
    let dmgFilename = null;
    let exeFilename = null;

    // Try to find .dmg and .exe files in each bucket
    for (const bucket of buckets || []) {
      const { data: files, error: listError } = await supabase.storage
        .from(bucket.name)
        .list('', { limit: 100 });

      if (!listError && files) {
        // Find DMG file
        const dmgFile = files.find(file => file.name.endsWith('.dmg'));
        if (dmgFile && !dmgUrl) {
          const { data: signedUrlData, error: urlError } = await supabase.storage
            .from(bucket.name)
            .createSignedUrl(dmgFile.name, 3600);

          if (!urlError && signedUrlData) {
            dmgUrl = signedUrlData.signedUrl;
            dmgFilename = dmgFile.name;
          }
        }

        // Find EXE file
        const exeFile = files.find(file => file.name.endsWith('.exe'));
        if (exeFile && !exeUrl) {
          const { data: signedUrlData, error: urlError } = await supabase.storage
            .from(bucket.name)
            .createSignedUrl(exeFile.name, 3600);

          if (!urlError && signedUrlData) {
            exeUrl = signedUrlData.signedUrl;
            exeFilename = exeFile.name;
          }
        }
      }
    }

    return c.json({ 
      dmg: dmgUrl ? { url: dmgUrl, filename: dmgFilename } : null,
      exe: exeUrl ? { url: exeUrl, filename: exeFilename } : null
    });
  } catch (error) {
    console.log('Server error while fetching downloads:', error);
    return c.json({ error: 'Internal server error', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);