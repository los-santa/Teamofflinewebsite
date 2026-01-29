interface NavigationProps {
  onNewsClick?: () => void;
  onLoginClick?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  userEmail?: string | null;
}

export default function Navigation({ onNewsClick, onLoginClick, onLogout, onProfileClick, userEmail }: NavigationProps) {
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
        <div className="flex-1 flex justify-end items-center gap-6">
          {userEmail ? (
            <div className="flex items-center gap-6">
              <button
                onClick={onProfileClick}
                className="flex items-center gap-3 group transition-opacity hover:opacity-80"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-white"
                  style={{ boxShadow: '0 0 0 2px #000000, 0 0 0 3px #FFFFFF' }}
                >
                  <span className="text-[10px] font-bold text-black font-mono">
                    {userEmail.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="text-left hidden md:block">
                  <div 
                    className="uppercase leading-none mb-1"
                    style={{ 
                      color: '#FFFFFF', 
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Account
                  </div>
                  <div 
                    className="leading-none opacity-50"
                    style={{ 
                      color: '#FFFFFF', 
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.625rem'
                    }}
                  >
                    {userEmail}
                  </div>
                </div>
              </button>
              
              <div className="h-8 w-px bg-white/20" />

              <button
                onClick={onLogout}
                className="uppercase px-4 py-2 transition-all hover:bg-white hover:text-black border-2 border-white" 
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'IBM Plex Mono, monospace', 
                  letterSpacing: '0.1em',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
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