import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import LoadingSpinner from './LoadingSpinner';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (email: string, accessToken: string) => void;
  onSignupClick: () => void;
}

export default function LoginPage({ onBack, onLoginSuccess, onSignupClick }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.session) {
        onLoginSuccess(email, data.session.access_token);
      }
    } catch (err) {
      setError('Failed to login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );
      
      console.log('OAuth Start - Project ID:', projectId);
      console.log('OAuth Start - Redirect URL:', window.location.origin);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setError(error.message);
        console.error('Google login error:', error);
      }
      // User will be redirected to Google login page
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
      console.error('Google login error:', err);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <div className="px-16 py-24">
        <button
          onClick={onBack}
          className="mb-12 uppercase transition-opacity hover:opacity-70"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.875rem',
            letterSpacing: '0.15em',
            fontWeight: '600',
            color: '#FFFFFF',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← BACK
        </button>

        <div className="max-w-md mx-auto">
          <h1
            className="uppercase text-center mb-12"
            style={{
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '3rem',
              letterSpacing: '0.15em',
              fontWeight: '700',
            }}
          >
            LOGIN
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 uppercase"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: '2px solid #FFFFFF',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 uppercase"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: '2px solid #FFFFFF',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            {error && (
              <div
                className="px-4 py-3 text-center"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#FF0000',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 uppercase transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                letterSpacing: '0.2em',
                fontWeight: '600',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? <LoadingSpinner size={20} color="#000000" /> : 'LOGIN'}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }} />
              </div>
              <div className="relative flex justify-center">
                <span 
                  className="px-4 uppercase"
                  style={{ 
                    backgroundColor: '#000000',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '0.625rem',
                    letterSpacing: '0.1em',
                    opacity: 0.5
                  }}
                >
                  OR
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full px-8 py-4 uppercase transition-opacity hover:opacity-80 flex items-center justify-center gap-3"
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                letterSpacing: '0.2em',
                fontWeight: '600',
                border: '2px solid #FFFFFF',
                cursor: 'pointer',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z" fill="#4285F4"/>
                <path d="M8.99976 18C11.4298 18 13.467 17.1941 14.9561 15.8195L12.0475 13.5613C11.2416 14.1013 10.2107 14.4204 8.99976 14.4204C6.65567 14.4204 4.67158 12.8372 3.96385 10.71H0.957031V13.0418C2.43794 15.9831 5.48158 18 8.99976 18Z" fill="#34A853"/>
                <path d="M3.96409 10.7098C3.78409 10.1698 3.68182 9.59301 3.68182 8.99983C3.68182 8.40664 3.78409 7.82983 3.96409 7.28983V4.95801H0.957273C0.347727 6.17301 0 7.54755 0 8.99983C0 10.4521 0.347727 11.8266 0.957273 13.0416L3.96409 10.7098Z" fill="#FBBC05"/>
                <path d="M8.99976 3.57955C10.3211 3.57955 11.5075 4.03364 12.4402 4.92545L15.0216 2.34409C13.4629 0.891818 11.4257 0 8.99976 0C5.48158 0 2.43794 2.01682 0.957031 4.95818L3.96385 7.29C4.67158 5.16273 6.65567 3.57955 8.99976 3.57955Z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={onSignupClick}
                className="uppercase transition-opacity hover:opacity-70"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}