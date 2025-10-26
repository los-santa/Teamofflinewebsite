import { ExternalLink } from 'lucide-react';

interface VideoCardProps {
  title: string;
  description: string;
  url: string;
  category?: string;
}

export default function VideoCard({ title, description, url, category }: VideoCardProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col group"
    >
      <div 
        className="relative h-56 flex flex-col justify-between p-6 transition-all duration-300 group-hover:scale-103"
        style={{ 
          border: '2px solid #F5E6D3',
          backgroundColor: '#2C231F'
        }}
      >
        <div>
          {category && (
            <p 
              className="uppercase mb-3" 
              style={{ 
                color: '#F5E6D3', 
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.625rem',
                letterSpacing: '0.15em',
                opacity: 0.5
              }}
            >
              {category}
            </p>
          )}
          
          <h3 
            className="mb-3" 
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '1.125rem',
              letterSpacing: '0.05em',
              fontWeight: '700',
              lineHeight: '1.3'
            }}
          >
            {title}
          </h3>
          
          <p 
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.8rem',
              lineHeight: '1.5',
              opacity: 0.7
            }}
          >
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <ExternalLink size={14} style={{ color: '#F5E6D3', opacity: 0.5 }} />
          <span 
            className="uppercase" 
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              opacity: 0.5
            }}
          >
            Watch Video
          </span>
        </div>
      </div>
    </a>
  );
}
