import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import DownloadPage from './components/DownloadPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'download'>('home');
  const products = [
    {
      id: 1,
      appName: 'Demand Check',
      description: 'Desire tracker. Record What you felt need.',
      available: false
    },
    {
      id: 2,
      appName: 'Motivator',
      description: 'Why am I doing this? Save photos of results.',
      available: false
    },
    {
      id: 3,
      appName: 'Wish to Real',
      description: 'Inspiration button, utilizing ForNeed relationships.',
      available: false
    },
    {
      id: 4,
      appName: 'Lyricist',
      description: 'Recognizes currently playing music.',
      available: false
    },
    {
      id: 5,
      appName: 'ForNeed',
      description: 'Task optimization by relation',
      available: true
    },
    {
      id: 6,
      appName: 'Reactive Mindmap',
      description: 'Near-perfect keyboard control',
      available: false
    },
    {
      id: 7,
      appName: 'Shortform Memo',
      description: 'Replace shorts to memo you wrote',
      available: false
    },
    {
      id: 8,
      appName: 'time tracking',
      description: 'What exactly you did.',
      available: false
    },
  ];

  if (currentPage === 'download') {
    return <DownloadPage onBack={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#3D2F2A', color: '#F5E6D3' }}>
      {/* Import fonts from Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      
      <Navigation />
      <Hero />
      
      <main className="px-16 pb-24" id="apps">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              appName={product.appName}
              description={product.description}
              available={product.available}
              onClick={product.appName === 'ForNeed' ? () => setCurrentPage('download') : undefined}
            />
          ))}
        </div>
      </main>

      <VideoSection />

      <Footer />
    </div>
  );
}
