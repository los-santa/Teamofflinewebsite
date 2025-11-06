import { ArrowLeft, Download, Apple, Monitor, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface DownloadPageProps {
  onBack: () => void;
  appName: string;
  description: string;
}

interface DownloadFile {
  url: string;
  filename: string;
}

interface Comment {
  id: string;
  email: string;
  comment: string;
  timestamp: number;
}

export default function DownloadPage({ onBack, appName, description }: DownloadPageProps) {
  const [dmgFile, setDmgFile] = useState<DownloadFile | null>(null);
  const [exeFile, setExeFile] = useState<DownloadFile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Only fetch downloads for ForNeed
    if (appName !== 'ForNeed') {
      setLoading(false);
      return;
    }

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
  }, [appName]);

  // Fetch comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/comments?appName=${encodeURIComponent(appName)}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setComments(data.comments || []);
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setCommentsLoading(false);
      }
    }

    fetchComments();
  }, [appName]);

  // Submit comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !comment.trim()) {
      alert('Please enter both email and comment.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/comments`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ appName, email: email.trim(), comment: comment.trim() })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments([data.comment, ...comments]);
        setEmail('');
        setComment('');
        alert('Comment submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to submit: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('An error occurred while submitting your comment.');
    } finally {
      setSubmitting(false);
    }
  };

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
            {appName}
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
            {description}
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

                {appName === 'ForNeed' && dmgFile ? (
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
                    className="text-center uppercase"
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                      letterSpacing: '0.08em',
                      color: '#F5E6D3',
                      opacity: 0.5
                    }}
                  >
                    COMING SOON
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

                {appName === 'ForNeed' && exeFile ? (
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
                    className="text-center uppercase"
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                      letterSpacing: '0.08em',
                      color: '#F5E6D3',
                      opacity: 0.5
                    }}
                  >
                    COMING SOON
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

          {/* Scroll hint */}
          <div className="mt-16 flex flex-col items-center animate-bounce">
            <div 
              className="mb-2 uppercase text-center"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: '#F5E6D3',
                opacity: 0.6
              }}
            >
              SCROLL DOWN TO LEAVE A COMMENT
            </div>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#F5E6D3" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ opacity: 0.6 }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl w-full mt-24 px-16 pb-24">
          <div 
            className="w-24 h-px mx-auto mb-12" 
            style={{ backgroundColor: '#F5E6D3' }}
          />

          <h2 
            className="mb-12 uppercase text-center"
            style={{ 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '2rem',
              color: '#F5E6D3',
              letterSpacing: '0.08em'
            }}
          >
            LEAVE FEEDBACK, REPORT BUGS, OR SHARE YOUR THOUGHTS
          </h2>

          {/* Comment Form */}
          <form 
            onSubmit={handleSubmitComment}
            className="mb-16 p-8"
            style={{ 
              border: '3px solid #F5E6D3',
              backgroundColor: '#2C231F'
            }}
          >
            <div className="mb-6">
              <label 
                htmlFor="email"
                className="block mb-2 uppercase"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: '#F5E6D3',
                  opacity: 0.8
                }}
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={100}
                placeholder="your@email.com"
                className="w-full px-4 py-3"
                style={{
                  backgroundColor: '#3D2F2A',
                  border: '2px solid #F5E6D3',
                  color: '#F5E6D3',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="comment"
                className="block mb-2 uppercase"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: '#F5E6D3',
                  opacity: 0.8
                }}
              >
                COMMENT
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
                rows={5}
                placeholder="I'd love to see a feature that..."
                className="w-full px-4 py-3 resize-none"
                style={{
                  backgroundColor: '#3D2F2A',
                  border: '2px solid #F5E6D3',
                  color: '#F5E6D3',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  outline: 'none'
                }}
              />
              <div 
                className="mt-2 text-right"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.7rem',
                  color: '#F5E6D3',
                  opacity: 0.5
                }}
              >
                {comment.length}/1000
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-3 px-8 py-3 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#F5E6D3',
                color: '#2C231F',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                letterSpacing: '0.08em',
                fontWeight: '600',
                border: 'none',
                cursor: submitting ? 'not-allowed' : 'pointer'
              }}
            >
              <Send size={18} />
              {submitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {commentsLoading ? (
              <div 
                className="text-center py-8"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                  color: '#F5E6D3',
                  opacity: 0.6
                }}
              >
                Loading comments...
              </div>
            ) : comments.length === 0 ? (
              <div 
                className="text-center py-8"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                  color: '#F5E6D3',
                  opacity: 0.5
                }}
              >
                No comments yet. Be the first to share your thoughts!
              </div>
            ) : (
              comments.map((c) => (
                <div 
                  key={c.id}
                  className="p-6"
                  style={{ 
                    border: '2px solid rgba(245, 230, 211, 0.3)',
                    backgroundColor: '#2C231F'
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div 
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.875rem',
                        color: '#F5E6D3',
                        fontWeight: '600'
                      }}
                    >
                      {c.email}
                    </div>
                    <div 
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.7rem',
                        color: '#F5E6D3',
                        opacity: 0.5
                      }}
                    >
                      {new Date(c.timestamp).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                  <div 
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.875rem',
                      color: '#F5E6D3',
                      lineHeight: '1.6',
                      opacity: 0.9,
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {c.comment}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
