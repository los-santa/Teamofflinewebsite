import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import DownloadPage from './components/DownloadPage';
import NewsPage from './components/NewsPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'download' | 'news'>('home');
  const [selectedProduct, setSelectedProduct] = useState<{ appName: string; description: string; trialLink?: string } | null>(null);
  const products = [
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
      id: 5,
      appName: 'ForNeed',
      description: 'Task optimization by relation',
      available: true,
      trialLink: 'https://example.com/trial/forneed'
    },
    {
      id: 6,
      appName: 'Mindmap + Life Optimization',
      description: 'Near-perfect keyboard control',
      available: false,
      trialLink: 'https://glassy-route-84219197.figma.site'
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
    {
      id: 11,
      appName: 'Personal People Database',
      description: 'Manage and organize your personal contacts',
      available: false,
      trialLink: 'https://example.com/trial/personal-people-database'
    },
    {
      id: 12,
      appName: 'Money Expectation',
      description: 'Track and forecast your financial expectations',
      available: false,
      trialLink: 'https://example.com/trial/money-expectation'
    },
    {
      id: 13,
      appName: 'Every Enter',
      description: 'Write and organize your daily thoughts',
      available: false,
      trialLink: 'https://example.com/trial/every-enter'
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#3D2F2A', color: '#F5E6D3' }}>
      {/* Import fonts from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <Navigation onNewsClick={() => setCurrentPage('news')} />
      <Hero />
      
      <main className="px-16 pb-24" id="apps">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              appName={product.appName}
              description={product.description}
              available={product.available}
              onClick={() => {
                setSelectedProduct({ 
                  appName: product.appName, 
                  description: product.description,
                  trialLink: product.trialLink
                });
                setCurrentPage('download');
              }}
            />
          ))}
        </div>
      </main>

      <VideoSection />

      <Footer />
    </div>
  );
}
