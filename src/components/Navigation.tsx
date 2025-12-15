interface NavigationProps {
  onNewsClick?: () => void;
  onLoginClick?: () => void;
  onLogout?: () => void;
  userEmail?: string | null;
}

export default function Navigation({ onNewsClick, onLoginClick, onLogout, userEmail }: NavigationProps) {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-12 py-5"
      style={{ 
        backgroundColor: '#000000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1" />
        <div className="flex justify-center items-center gap-12">
          <a 
            href="#" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.875rem'
            }}
          >
            Home
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
          <span style={{ color: '#FFFFFF', opacity: 0.3 }}>|</span>
          <a 
            href="#apps" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.875rem'
            }}
          >
            Apps
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
          <span style={{ color: '#FFFFFF', opacity: 0.3 }}>|</span>
          <a 
            href="#videos" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.875rem'
            }}
          >
            Videos
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
          <span style={{ color: '#FFFFFF', opacity: 0.3 }}>|</span>
          <button
            onClick={onNewsClick}
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.875rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            News
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </button>
          <span style={{ color: '#FFFFFF', opacity: 0.3 }}>|</span>
          <a 
            href="#about" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.875rem'
            }}
          >
            About
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
          <span style={{ color: '#FFFFFF', opacity: 0.3 }}>|</span>
          <a 
            href="#contact" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.875rem'
            }}
          >
            Contact
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          {userEmail ? (
            <>
              <span 
                style={{ 
                  color: '#FFFFFF', 
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '0.75rem',
                  opacity: 0.7
                }}
              >
                {userEmail}
              </span>
              <button
                onClick={onLogout}
                className="uppercase relative group px-4 py-2" 
                style={{ 
                  color: '#000000',
                  backgroundColor: '#FFFFFF',
                  fontFamily: 'IBM Plex Mono, monospace', 
                  letterSpacing: '0.08em',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="uppercase relative group px-4 py-2" 
              style={{ 
                color: '#000000',
                backgroundColor: '#FFFFFF',
                fontFamily: 'IBM Plex Mono, monospace', 
                letterSpacing: '0.08em',
                fontSize: '0.75rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}