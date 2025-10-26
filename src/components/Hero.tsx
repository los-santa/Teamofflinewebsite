import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export default function Hero() {
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogo() {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/icon`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            setLogoUrl(data.url);
          } else {
            console.error('No URL in response:', data);
          }
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch logo:', errorData);
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLogo();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-16 py-24">
      <div className="mb-8">
        {loading ? (
          <div 
            className="w-48 h-48 mx-auto flex items-center justify-center"
            style={{ 
              fontFamily: 'League Spartan, sans-serif',
              color: '#F5E6D3'
            }}
          >
            <span style={{ opacity: 0.5 }}>Loading...</span>
          </div>
        ) : logoUrl ? (
          <div 
            className="relative"
            style={{
              padding: '24px',
              border: '3px solid #F5E6D3',
              boxShadow: 'inset 0 0 0 8px #3D2F2A, inset 0 0 0 10px #F5E6D3'
            }}
          >
            <ImageWithFallback
              src={logoUrl}
              alt="Team Offline Logo"
              className="w-auto h-48 mx-auto block"
              style={{ display: 'block' }}
            />
          </div>
        ) : (
          <h1 
            style={{ 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '4rem',
              color: '#F5E6D3',
              letterSpacing: '0.02em'
            }}
          >
            TEAM OFFLINE
          </h1>
        )}
      </div>
      <p 
        className="mb-6 uppercase max-w-4xl mx-auto text-center" 
        style={{ 
          color: '#F5E6D3', 
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
        style={{ backgroundColor: '#F5E6D3' }}
      />
    </section>
  );
}
