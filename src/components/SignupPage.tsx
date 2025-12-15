import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import LoadingSpinner from './LoadingSpinner';

interface SignupPageProps {
  onBack: () => void;
  onSignupSuccess: () => void;
  onLoginClick: () => void;
}

export default function SignupPage({ onBack, onSignupSuccess, onLoginClick }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-7d6c9568/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            password,
            name,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        onSignupSuccess();
      } else {
        setError(data.error || 'Failed to sign up. Please try again.');
      }
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
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
            SIGN UP
          </h1>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 uppercase"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 uppercase"
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? <LoadingSpinner size={20} color="#000000" /> : 'SIGN UP'}
            </button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={onLoginClick}
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
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
