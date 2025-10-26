interface GalleryItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function GalleryItem({ icon, title, description }: GalleryItemProps) {
  return (
    <div className="flex flex-col items-center gap-6 group">
      <div 
        className="relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-103"
        style={{ 
          border: '2px solid #000000',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
        }}
      >
        <div style={{ color: '#000000' }}>
          {icon}
        </div>
      </div>
      <div className="text-center">
        <p 
          className="uppercase mb-2" 
          style={{ 
            color: '#000000', 
            fontFamily: 'League Spartan, sans-serif',
            fontSize: '1.125rem',
            letterSpacing: '0.15em',
            fontWeight: '700'
          }}
        >
          {title}
        </p>
        <p 
          style={{ 
            color: '#666666', 
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.875rem',
            maxWidth: '280px',
            lineHeight: '1.6'
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
