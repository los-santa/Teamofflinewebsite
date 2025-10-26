import VideoCard from './VideoCard';

export default function VideoSection() {
  const videos = [
    {
      id: 1,
      title: 'Philosophy You Must Know to Truly Understand Yourself',
      description: 'Nietzsche\'s self-creation and Camus\' philosophy of the absurd',
      url: 'https://www.youtube.com/watch?v=fEV7zxnbvr0&t=442s',
      category: 'PHILOSOPHY'
    },
    {
      id: 2,
      title: 'The Philosophy of Slow Design',
      description: 'Creating meaningful products through intentional thinking',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      category: 'DESIGN'
    },
    {
      id: 3,
      title: 'Building Second Brains',
      description: 'Tiago Forte on knowledge management systems',
      url: 'https://www.youtube.com/watch?v=OP3dA2GcAh8',
      category: 'KNOWLEDGE'
    },
    {
      id: 4,
      title: 'Analog Tools for Digital Thinkers',
      description: 'The power of pen and paper in modern workflows',
      url: 'https://www.youtube.com/watch?v=example4',
      category: 'TOOLS'
    },
    {
      id: 5,
      title: 'The Art of Note-Taking',
      description: 'Zettelkasten method and permanent notes',
      url: 'https://www.youtube.com/watch?v=example5',
      category: 'LEARNING'
    },
    {
      id: 6,
      title: 'Mindful Creation Process',
      description: 'Slowing down to create better work',
      url: 'https://www.youtube.com/watch?v=example6',
      category: 'CREATIVITY'
    }
  ];

  return (
    <section className="px-16 py-24" id="videos">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="uppercase mb-4" 
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '2.5rem',
              letterSpacing: '0.08em',
              fontWeight: '700'
            }}
          >
            Recommended Videos
          </h2>
          <p 
            className="uppercase" 
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              opacity: 0.6
            }}
          >
            Curated content for deep thinkers
          </p>
          <div 
            className="w-24 h-px mx-auto mt-6" 
            style={{ backgroundColor: '#F5E6D3' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              url={video.url}
              category={video.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
