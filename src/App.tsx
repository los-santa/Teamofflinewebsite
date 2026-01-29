import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import MainAppCard from './components/MainAppCard';
import AdditionalToolCard from './components/AdditionalToolCard';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import DownloadPage from './components/DownloadPage';
import NewsPage from './components/NewsPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'download' | 'news' | 'login' | 'signup' | 'profile'>('home');
  const [selectedProduct, setSelectedProduct] = useState<{ appName: string; description: string; trialLink?: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createClient(
          `https://${projectId}.supabase.co`,
          publicAnonKey
        );
        
        // Check for OAuth callback
        const { data: authData, error: authError } = await supabase.auth.getSession();
        
        if (!authError && authData.session) {
          setUserEmail(authData.session.user.email || null);
          setAccessToken(authData.session.access_token);
          console.log('User logged in:', authData.session.user.email);
        }

        // Listen for auth state changes (for OAuth redirects)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            setUserEmail(session.user.email || null);
            setAccessToken(session.access_token);
            console.log('Auth state changed:', session.user.email);
          } else {
            setUserEmail(null);
            setAccessToken(null);
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        // Silently handle error - session check is optional
        console.error('Session check error:', error);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey
      );
      await supabase.auth.signOut();
      setUserEmail(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLoginSuccess = (email: string, token: string) => {
    setUserEmail(email);
    setAccessToken(token);
    setCurrentPage('home');
  };

  const handleSignupSuccess = () => {
    // After signup, redirect to login
    setCurrentPage('login');
  };
  
  // Main app
  const mainApp = {
    id: 5,
    appName: 'ForNeed',
    description: 'Task optimization by relation',
    available: 'download' as const,
    trialLink: 'https://example.com/trial/forneed'
  };

  // Additional tools for ForNeed
  const additionalTools = [
    {
      id: 6,
      appName: 'CIRCLES MIND LOADMAP',
      description: 'Near-perfect keyboard control',
      available: 'trial' as const,
      trialLink: 'https://glassy-route-84219197.figma.site'
    },
    {
      id: 13,
      appName: 'Every Enter',
      description: 'Write and organize your daily thoughts',
      available: 'trial' as const,
      trialLink: 'https://corner-echo-27155086.figma.site'
    },
    {
      id: 12,
      appName: 'Money Monitor',
      description: 'Track and forecast your financial expectations',
      available: 'trial' as const,
      trialLink: 'https://emote-stair-41398259.figma.site'
    },
    {
      id: 11,
      appName: 'Personal People Database',
      description: 'Manage and organize your personal contacts',
      available: 'trial' as const,
      trialLink: 'https://tool-pickle-06548265.figma.site'
    },
  ];

  // Other apps (coming soon)
  const comingSoonApps = [
    {
      id: 1,
      appName: 'Demand Check',
      description: 'Desire tracker. Record What you felt need.',
      available: false,
      trialLink: 'https://example.com/trial/demand-check'
    },
    {
      id: 2,
      appName: 'Motivator',
      description: 'Why am I doing this? Save photos of results.',
      available: false,
      trialLink: 'https://example.com/trial/motivator'
    },
    {
      id: 3,
      appName: 'Wish to Real',
      description: 'Inspiration button, utilizing ForNeed relationships.',
      available: false,
      trialLink: 'https://example.com/trial/wish-to-real'
    },
    {
      id: 4,
      appName: 'Lyricist',
      description: 'Recognizes currently playing music.',
      available: false,
      trialLink: 'https://example.com/trial/lyricist'
    },
    {
      id: 7,
      appName: 'Shortform Memo',
      description: 'Replace shorts to memo you wrote',
      available: false,
      trialLink: 'https://example.com/trial/shortform-memo'
    },
    {
      id: 8,
      appName: 'time tracking',
      description: 'What exactly you did.',
      available: false,
      trialLink: 'https://example.com/trial/time-tracking'
    },
    {
      id: 9,
      appName: 'Operater',
      description: 'Business management and operations tool',
      available: false,
      trialLink: 'https://example.com/trial/operater'
    },
    {
      id: 10,
      appName: 'Scenario',
      description: 'Plan and visualize different scenarios',
      available: false,
      trialLink: 'https://example.com/trial/scenario'
    },
  ];

  if (currentPage === 'download' && selectedProduct) {
    return (
      <DownloadPage 
        onBack={() => {
          setCurrentPage('home');
          setSelectedProduct(null);
        }} 
        appName={selectedProduct.appName}
        description={selectedProduct.description}
        trialLink={selectedProduct.trialLink}
      />
    );
  }

  if (currentPage === 'news') {
    return (
      <NewsPage 
        onBack={() => setCurrentPage('home')} 
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage 
        onBack={() => setCurrentPage('home')} 
        onLoginSuccess={handleLoginSuccess}
        onSignupClick={() => setCurrentPage('signup')}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignupPage 
        onBack={() => setCurrentPage('home')} 
        onSignupSuccess={handleSignupSuccess}
        onLoginClick={() => setCurrentPage('login')}
      />
    );
  }

  if (currentPage === 'profile' && userEmail) {
    return (
      <ProfilePage 
        userEmail={userEmail}
        onBack={() => setCurrentPage('home')}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>
      {/* Import fonts from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <Navigation 
        onNewsClick={() => setCurrentPage('news')} 
        onLoginClick={() => setCurrentPage('login')}
        onLogout={handleLogout}
        onProfileClick={() => setCurrentPage('profile')}
        userEmail={userEmail}
      />
      <Hero />
      
      <main className="px-16 pb-24" id="apps">
        {/* Main App Section */}
        <section className="mb-32">
          <div className="flex justify-center">
            <MainAppCard
              appName={mainApp.appName}
              description={mainApp.description}
              available={mainApp.available}
              onClick={() => {
                setSelectedProduct({ 
                  appName: mainApp.appName, 
                  description: mainApp.description,
                  trialLink: mainApp.trialLink
                });
                setCurrentPage('download');
              }}
            />
          </div>
        </section>

        {/* Additional Tools Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 
              className="uppercase mb-4" 
              style={{ 
                fontFamily: 'League Spartan, sans-serif',
                fontSize: '2.5rem',
                letterSpacing: '0.15em',
                fontWeight: '700'
              }}
            >
              ADDITIONAL TOOLS
            </h2>
            <p 
              style={{ 
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                opacity: 0.7
              }}
            >
              EXTENDED FUNCTIONALITY FOR FORNEED
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {additionalTools.map((tool) => (
              <AdditionalToolCard
                key={tool.id}
                appName={tool.appName}
                description={tool.description}
                available={tool.available}
                onClick={() => {
                  setSelectedProduct({ 
                    appName: tool.appName, 
                    description: tool.description,
                    trialLink: tool.trialLink
                  });
                  setCurrentPage('download');
                }}
              />
            ))}
          </div>
        </section>

        {/* Coming Soon Section */}
        <section>
          <div className="text-center mb-16">
            <h2 
              className="uppercase mb-4" 
              style={{ 
                fontFamily: 'League Spartan, sans-serif',
                fontSize: '2rem',
                letterSpacing: '0.15em',
                fontWeight: '700',
                opacity: 0.6
              }}
            >
              COMING SOON
            </h2>
            <p 
              style={{ 
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                opacity: 0.5
              }}
            >
              FUTURE EXPANSIONS
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {comingSoonApps.map((app) => (
              <ProductCard
                key={app.id}
                appName={app.appName}
                description={app.description}
                available={app.available}
                onClick={() => {
                  setSelectedProduct({ 
                    appName: app.appName, 
                    description: app.description,
                    trialLink: app.trialLink
                  });
                  setCurrentPage('download');
                }}
              />
            ))}
          </div>
        </section>
      </main>

      <VideoSection />

      <Footer />
    </div>
  );
}