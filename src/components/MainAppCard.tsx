interface MainAppCardProps {
  appName: string;
  description: string;
  available?: 'download' | 'trial' | false;
  onClick?: () => void;
}

export default function MainAppCard({ appName, description, available, onClick }: MainAppCardProps) {
  return (
    <div className="flex flex-col items-center group">
      <div 
        className="relative w-[500px] h-[500px] rounded-full flex flex-col items-center justify-center p-16 transition-all duration-300 group-hover:scale-102"
        style={{ 
          border: '5px solid #FFFFFF',
          backgroundColor: '#FFFFFF',
          cursor: onClick ? 'pointer' : 'default',
          boxShadow: '0 16px 48px rgba(255, 255, 255, 0.4)'
        }}
        onClick={onClick}
      >
        {available && (
          <div 
            className="absolute top-12 uppercase"
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              padding: '8px 24px',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
              letterSpacing: '0.2em',
              fontWeight: '600',
              borderRadius: '2px'
            }}
          >
            {available === 'download' ? 'Download Available' : 'Trial Available'}
          </div>
        )}
        <div className="text-center flex flex-col items-center justify-center h-full gap-8">
          <div 
            className="uppercase"
            style={{
              color: '#000000',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
              letterSpacing: '0.3em',
              fontWeight: '600',
              opacity: 0.6
            }}
          >
            MAIN APPLICATION
          </div>
          
          <h3 
            className="uppercase" 
            style={{ 
              color: '#000000', 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '3.5rem',
              letterSpacing: '0.1em',
              fontWeight: '700',
              lineHeight: '1.1'
            }}
          >
            {appName}
          </h3>
          
          <div 
            className="w-32 h-1" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          />
          
          <p 
            style={{ 
              color: '#000000', 
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '1.125rem',
              lineHeight: '1.8',
              maxWidth: '400px',
              letterSpacing: '0.02em'
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
