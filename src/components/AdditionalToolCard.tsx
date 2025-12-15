interface AdditionalToolCardProps {
  appName: string;
  description: string;
  available?: 'download' | 'trial' | false;
  onClick?: () => void;
}

export default function AdditionalToolCard({ appName, description, available, onClick }: AdditionalToolCardProps) {
  return (
    <div className="flex flex-col items-center group">
      <div 
        className="relative w-56 h-56 rounded-full flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:scale-105"
        style={{ 
          border: available ? '2px solid #000000' : '2px solid #FFFFFF',
          backgroundColor: available ? '#FFFFFF' : '#000000',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: available ? 'none' : '0 4px 16px rgba(255, 255, 255, 0.15)'
        }}
        onClick={onClick}
      >
        {available && (
          <div 
            className="absolute top-6 uppercase"
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '3px 10px',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.15em',
              fontWeight: '600',
              borderRadius: '2px'
            }}
          >
            {available === 'download' ? 'Download' : 'Trial'}
          </div>
        )}
        <div className="text-center flex flex-col items-center justify-center h-full gap-3">
          <h3 
            className="uppercase" 
            style={{ 
              color: available ? '#000000' : '#FFFFFF', 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '1.25rem',
              letterSpacing: '0.08em',
              fontWeight: '700',
              lineHeight: '1.2'
            }}
          >
            {appName}
          </h3>
          
          <div 
            className="w-12 h-px" 
            style={{ backgroundColor: available ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)' }}
          />
          
          <p 
            style={{ 
              color: available ? '#000000' : '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.75rem',
              lineHeight: '1.5',
              maxWidth: '180px',
              opacity: 0.9
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
