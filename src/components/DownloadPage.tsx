import { ArrowLeft, Download, Apple, Monitor } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DownloadPageProps {
  onBack: () => void;
}

interface DownloadFile {
  url: string;
  filename: string;
}

export default function DownloadPage({ onBack }: DownloadPageProps) {
  const [dmgFile, setDmgFile] = useState<DownloadFile | null>(null);
  const [exeFile, setExeFile] = useState<DownloadFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDownloads() {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/downloads`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.dmg) {
            setDmgFile(data.dmg);
          }
          if (data.exe) {
            setExeFile(data.exe);
          }
          if (!data.dmg && !data.exe) {
            console.error('No download files found:', data);
          }
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch downloads:', errorData);
        }
      } catch (error) {
        console.error('Error fetching downloads:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDownloads();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#3D2F2A', color: '#F5E6D3' }}>
      <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      {/* Navigation */}
      <nav className="px-16 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.875rem',
            letterSpacing: '0.08em',
            color: '#F5E6D3'
          }}
        >
          <ArrowLeft size={20} />
          BACK
        </button>
      </nav>

      {/* Download Section */}
      <main className="flex flex-col items-center justify-center px-16 py-24 min-h-[calc(100vh-120px)]">
        <div className="max-w-3xl w-full text-center">
          <h1 
            className="mb-6 uppercase"
            style={{ 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '4rem',
              color: '#F5E6D3',
              letterSpacing: '0.05em'
            }}
          >
            ForNeed
          </h1>

          <p 
            className="mb-12 uppercase"
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
              letterSpacing: '0.12em',
              opacity: 0.8
            }}
          >
            Task optimization by relation
          </p>

          <div 
            className="w-24 h-px mx-auto mb-16" 
            style={{ backgroundColor: '#F5E6D3' }}
          />

          {/* Download Cards */}
          {loading ? (
            <div 
              className="p-12"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                color: '#F5E6D3',
                opacity: 0.6
              }}
            >
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* macOS Download */}
              <div 
                className="p-10"
                style={{ 
                  border: '3px solid #F5E6D3',
                  backgroundColor: '#2C231F'
                }}
              >
                <div className="flex items-center justify-center mb-6">
                  <Apple size={48} style={{ color: '#F5E6D3' }} />
                </div>
                
                <div 
                  className="mb-6 uppercase text-center"
                  style={{
                    fontFamily: 'League Spartan, sans-serif',
                    fontSize: '1.25rem',
                    letterSpacing: '0.08em',
                    color: '#F5E6D3'
                  }}
                >
                  macOS
                </div>

                {dmgFile ? (
                  <>
                    <a
                      href={dmgFile.url}
                      download
                      className="inline-flex items-center justify-center gap-3 px-6 py-3 w-full transition-all hover:scale-105"
                      style={{
                        backgroundColor: '#F5E6D3',
                        color: '#2C231F',
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.875rem',
                        letterSpacing: '0.08em',
                        fontWeight: '600',
                        textDecoration: 'none'
                      }}
                    >
                      <Download size={18} />
                      DOWNLOAD
                    </a>
                    <p 
                      className="mt-6 text-center"
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.7rem',
                        color: '#F5E6D3',
                        opacity: 0.5,
                        lineHeight: '1.6'
                      }}
                    >
                      Requires macOS 10.15+
                    </p>
                  </>
                ) : (
                  <div 
                    className="text-center"
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                      color: '#F5E6D3',
                      opacity: 0.4
                    }}
                  >
                    Not available
                  </div>
                )}
              </div>

              {/* Windows Download */}
              <div 
                className="p-10"
                style={{ 
                  border: '3px solid #F5E6D3',
                  backgroundColor: '#2C231F'
                }}
              >
                <div className="flex items-center justify-center mb-6">
                  <Monitor size={48} style={{ color: '#F5E6D3' }} />
                </div>
                
                <div 
                  className="mb-6 uppercase text-center"
                  style={{
                    fontFamily: 'League Spartan, sans-serif',
                    fontSize: '1.25rem',
                    letterSpacing: '0.08em',
                    color: '#F5E6D3'
                  }}
                >
                  Windows
                </div>

                {exeFile ? (
                  <>
                    <a
                      href={exeFile.url}
                      download
                      className="inline-flex items-center justify-center gap-3 px-6 py-3 w-full transition-all hover:scale-105"
                      style={{
                        backgroundColor: '#F5E6D3',
                        color: '#2C231F',
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.875rem',
                        letterSpacing: '0.08em',
                        fontWeight: '600',
                        textDecoration: 'none'
                      }}
                    >
                      <Download size={18} />
                      DOWNLOAD
                    </a>
                    <p 
                      className="mt-6 text-center"
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.7rem',
                        color: '#F5E6D3',
                        opacity: 0.5,
                        lineHeight: '1.6'
                      }}
                    >
                      Requires Windows 10+
                    </p>
                  </>
                ) : (
                  <div 
                    className="text-center"
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                      color: '#F5E6D3',
                      opacity: 0.4
                    }}
                  >
                    Not available
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div 
            className="mt-16 max-w-2xl mx-auto"
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
              color: '#F5E6D3',
              opacity: 0.7,
              lineHeight: '1.8'
            }}
          >
            <p className="mb-4">
              ForNeed helps you optimize your tasks through intelligent relationship mapping.
            </p>
            <p>
              For support, contact us via Instagram @teamoffline or email.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
