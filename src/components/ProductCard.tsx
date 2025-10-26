interface ProductCardProps {
  appName: string;
  description: string;
  available?: boolean;
  onClick?: () => void;
}

export default function ProductCard({ appName, description, available, onClick }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center group">
      <div 
        className="relative w-72 h-72 rounded-full flex flex-col items-center justify-center p-8 transition-all duration-300 group-hover:scale-103"
        style={{ 
          border: '3px solid #F5E6D3',
          backgroundColor: '#2C231F',
          cursor: onClick ? 'pointer' : 'default'
        }}
        onClick={onClick}
      >
        {available && (
          <div 
            className="absolute top-8 uppercase"
            style={{
              backgroundColor: '#F5E6D3',
              color: '#2C231F',
              padding: '4px 12px',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.625rem',
              letterSpacing: '0.15em',
              fontWeight: '600',
              borderRadius: '2px'
            }}
          >
            Available
          </div>
        )}
        <div className="text-center flex flex-col items-center justify-center h-full gap-4">
          <h3 
            className="uppercase" 
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'League Spartan, sans-serif',
              fontSize: '1.75rem',
              letterSpacing: '0.08em',
              fontWeight: '700',
              lineHeight: '1.2'
            }}
          >
            {appName}
          </h3>
          
          <div 
            className="w-16 h-px" 
            style={{ backgroundColor: 'rgba(245, 230, 211, 0.3)' }}
          />
          
          <p 
            style={{ 
              color: '#F5E6D3', 
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              maxWidth: '240px'
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
