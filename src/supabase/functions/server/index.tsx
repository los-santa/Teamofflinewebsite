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

// Get all comments for a specific app
app.get("/make-server-7d6c9568/comments", async (c) => {
  try {
    const appName = c.req.query('appName') || '';
    if (!appName) {
      return c.json({ error: 'appName query parameter is required' }, 400);
    }
    
    const prefix = `comment:${appName}:`;
    const comments = await kv.getByPrefix(prefix);
    // Sort by timestamp descending (newest first)
    const sortedComments = comments.sort((a, b) => b.timestamp - a.timestamp);
    return c.json({ comments: sortedComments });
  } catch (error) {
    console.log('Server error while fetching comments:', error);
    return c.json({ error: 'Failed to fetch comments', details: String(error) }, 500);
  }
});

// Post a new comment
app.post("/make-server-7d6c9568/comments", async (c) => {
  try {
    const body = await c.req.json();
    const { appName, email, comment } = body;

    if (!appName || !email || !comment) {
      return c.json({ error: 'appName, email and comment are required' }, 400);
    }

    if (comment.length > 1000) {
      return c.json({ error: 'Comment is too long (max 1000 characters)' }, 400);
    }

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const id = `comment:${appName}:${timestamp}-${randomId}`;
    const commentData = {
      id,
      email: email.substring(0, 100), // Limit email length
      comment: comment.substring(0, 1000),
      timestamp
    };

    await kv.set(id, commentData);
    return c.json({ success: true, comment: commentData });
  } catch (error) {
    console.log('Server error while posting comment:', error);
    return c.json({ error: 'Failed to post comment', details: String(error) }, 500);
  }
});

// Get all news
app.get("/make-server-7d6c9568/news", async (c) => {
  try {
    const prefix = 'news:';
    const news = await kv.getByPrefix(prefix);
    // Sort by timestamp descending (newest first)
    const sortedNews = news.sort((a, b) => b.timestamp - a.timestamp);
    return c.json({ news: sortedNews });
  } catch (error) {
    console.log('Server error while fetching news:', error);
    return c.json({ error: 'Failed to fetch news', details: String(error) }, 500);
  }
});

// Post a new news item
app.post("/make-server-7d6c9568/news", async (c) => {
  try {
    const body = await c.req.json();
    const { title, content, password } = body;

    if (!title || !content || !password) {
      return c.json({ error: 'title, content and password are required' }, 400);
    }

    // Verify password
    if (password !== '5824397') {
      return c.json({ error: 'Incorrect password' }, 403);
    }

    if (title.length > 200) {
      return c.json({ error: 'Title is too long (max 200 characters)' }, 400);
    }

    if (content.length > 2000) {
      return c.json({ error: 'Content is too long (max 2000 characters)' }, 400);
    }

    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const id = `news:${timestamp}-${randomId}`;
    const newsData = {
      id,
      title: title.substring(0, 200),
      content: content.substring(0, 2000),
      timestamp
    };

    await kv.set(id, newsData);
    return c.json({ success: true, news: newsData });
  } catch (error) {
    console.log('Server error while posting news:', error);
    return c.json({ error: 'Failed to post news', details: String(error) }, 500);
  }
});

// Sign up endpoint
app.post("/make-server-7d6c9568/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    if (password.length < 6) {
      return c.json({ error: 'Password must be at least 6 characters' }, 400);
    }

    // Create user with admin API
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || '' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Server error while creating user:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: { id: data.user.id, email: data.user.email } });
  } catch (error) {
    console.log('Server error while signing up:', error);
    return c.json({ error: 'Failed to sign up', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);