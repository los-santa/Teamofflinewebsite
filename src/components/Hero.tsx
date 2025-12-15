import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import LoadingSpinner from './LoadingSpinner';

export default function Hero() {
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/icon`,
          {
            headers: {
              Authorization: `Bearer ${publicAnonKey}`,
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            setLogoUrl(data.url);
          }
        }
      } catch (error) {
        // Silently handle error - logo is optional
        // Logo may not be uploaded yet
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-16 py-24">
      <div className="mb-8">
        <div 
          className="relative flex items-center justify-center"
          style={{
            padding: '24px',
            border: '3px solid #FFFFFF',
            boxShadow: 'inset 0 0 0 8px #000000, inset 0 0 0 10px #FFFFFF',
            minHeight: '240px',
            minWidth: '240px'
          }}
        >
          {loading ? (
            <LoadingSpinner size={60} />
          ) : logoUrl ? (
            <img
              src={logoUrl}
              alt="Team Offline Logo"
              className="w-auto h-48 mx-auto block"
              style={{ display: 'block' }}
            />
          ) : null}
        </div>
      </div>
      <p 
        className="mb-6 uppercase max-w-4xl mx-auto text-center" 
        style={{ 
          color: '#FFFFFF', 
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '0.875rem',
          letterSpacing: '0.12em',
          opacity: 0.8
        }}
      >
        Personal database company.
      </p>
      <div 
        className="w-24 h-px" 
        style={{ backgroundColor: '#FFFFFF' }}
      />
    </section>
  );
}