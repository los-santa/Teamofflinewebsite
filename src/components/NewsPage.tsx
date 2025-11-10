import { ArrowLeft, Send, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import LoadingSpinner from './LoadingSpinner';

interface NewsPageProps {
  onBack: () => void;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  timestamp: number;
}

export default function NewsPage({ onBack }: NewsPageProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/news`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNews(data.news || []);
      } else {
        console.error('Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please enter both title and content.');
      return;
    }
    setShowPasswordModal(true);
  };

  const handleSubmitNews = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/news`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            title: title.trim(), 
            content: content.trim(),
            password: password
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNews([data.news, ...news]);
        setTitle('');
        setContent('');
        setPassword('');
        setShowPasswordModal(false);
        alert('News posted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Failed to post news: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error submitting news:', error);
      alert('An error occurred while posting news.');
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

      {/* Main Content */}
      <main className="px-16 py-12 max-w-5xl mx-auto">
        <h1 
          className="mb-6 uppercase text-center"
          style={{ 
            fontFamily: 'League Spartan, sans-serif',
            fontSize: '4rem',
            color: '#F5E6D3',
            letterSpacing: '0.05em'
          }}
        >
          NEWS
        </h1>

        <div 
          className="w-24 h-px mx-auto mb-12" 
          style={{ backgroundColor: '#F5E6D3' }}
        />

        {/* Warning Message */}
        <div 
          className="mb-12 p-6 text-center"
          style={{ 
            border: '2px solid rgba(245, 230, 211, 0.5)',
            backgroundColor: 'rgba(245, 230, 211, 0.1)'
          }}
        >
          <p 
            className="uppercase"
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
              letterSpacing: '0.1em',
              color: '#F5E6D3',
              opacity: 0.8
            }}
          >
            ⚠️ VISITORS CANNOT WRITE NEWS. ADMIN ACCESS ONLY.
          </p>
        </div>

        {/* News Form */}
        <div 
          className="mb-16 p-8"
          style={{ 
            border: '3px solid #F5E6D3',
            backgroundColor: '#2C231F'
          }}
        >
          <h2 
            className="mb-6 uppercase"
            style={{ 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '1.5rem',
              color: '#F5E6D3',
              letterSpacing: '0.08em'
            }}
          >
            POST NEWS
          </h2>

          <div className="mb-6">
            <label 
              htmlFor="title"
              className="block mb-2 uppercase"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '#F5E6D3',
                opacity: 0.8
              }}
            >
              TITLE
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={200}
              placeholder="Enter news title..."
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
              htmlFor="content"
              className="block mb-2 uppercase"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: '#F5E6D3',
                opacity: 0.8
              }}
            >
              CONTENT
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={2000}
              rows={8}
              placeholder="Enter news content..."
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
              {content.length}/2000
            </div>
          </div>

          <button
            onClick={handleUploadClick}
            className="inline-flex items-center gap-3 px-8 py-3 transition-all hover:scale-105"
            style={{
              backgroundColor: '#F5E6D3',
              color: '#2C231F',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
              letterSpacing: '0.08em',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Send size={18} />
            UPLOAD
          </button>
        </div>

        {/* Password Modal */}
        {showPasswordModal && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => !submitting && setShowPasswordModal(false)}
          >
            <div 
              className="p-8 max-w-md w-full mx-4"
              style={{ 
                border: '3px solid #F5E6D3',
                backgroundColor: '#2C231F'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock size={24} style={{ color: '#F5E6D3' }} />
                <h3 
                  className="uppercase"
                  style={{ 
                    fontFamily: 'League Spartan, sans-serif',
                    fontSize: '1.5rem',
                    color: '#F5E6D3',
                    letterSpacing: '0.08em'
                  }}
                >
                  ENTER PASSWORD
                </h3>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 mb-6"
                style={{
                  backgroundColor: '#3D2F2A',
                  border: '2px solid #F5E6D3',
                  color: '#F5E6D3',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !submitting) {
                    handleSubmitNews();
                  }
                }}
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSubmitNews}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  {submitting ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 transition-all hover:scale-105 disabled:opacity-50"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #F5E6D3',
                    color: '#F5E6D3',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.875rem',
                    letterSpacing: '0.08em',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* News List */}
        <div 
          className="w-24 h-px mx-auto mb-12" 
          style={{ backgroundColor: '#F5E6D3' }}
        />

        <h2 
          className="mb-8 uppercase text-center"
          style={{ 
            fontFamily: 'League Spartan, sans-serif',
            fontSize: '2rem',
            color: '#F5E6D3',
            letterSpacing: '0.08em'
          }}
        >
          ALL NEWS
        </h2>

        <div className="space-y-8">
          {loading ? (
            <div className="text-center py-12 flex flex-col items-center gap-4">
              <LoadingSpinner size={50} />
              <div 
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                  color: '#F5E6D3',
                  opacity: 0.6,
                  letterSpacing: '0.08em'
                }}
              >
                LOADING NEWS...
              </div>
            </div>
          ) : news.length === 0 ? (
            <div 
              className="text-center py-12"
              style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                color: '#F5E6D3',
                opacity: 0.5
              }}
            >
              No news yet. Be the first to post!
            </div>
          ) : (
            news.map((item) => (
              <div 
                key={item.id}
                className="p-8"
                style={{ 
                  border: '3px solid #F5E6D3',
                  backgroundColor: '#2C231F'
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 
                    style={{
                      fontFamily: 'League Spartan, sans-serif',
                      fontSize: '1.5rem',
                      color: '#F5E6D3',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {item.title}
                  </h3>
                  <div 
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.7rem',
                      color: '#F5E6D3',
                      opacity: 0.5,
                      whiteSpace: 'nowrap',
                      marginLeft: '1rem'
                    }}
                  >
                    {new Date(item.timestamp).toLocaleDateString('en-US', {
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
                    lineHeight: '1.8',
                    opacity: 0.9,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {item.content}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
