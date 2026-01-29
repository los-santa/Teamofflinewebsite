import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LogOut, User, ChevronDown } from 'lucide-react';

interface NavigationProps {
  onNewsClick?: () => void;
  onLoginClick?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  userEmail?: string | null;
}

export default function Navigation({ onNewsClick, onLoginClick, onLogout, onProfileClick, userEmail }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-8 md:px-12 py-5"
      style={{ 
        backgroundColor: '#000000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
      }}
    >
      <div className="flex justify-between items-center max-w-[1600px] mx-auto">
        {/* Left spacer for symmetry */}
        <div className="hidden lg:block w-48" />

        {/* Center Links */}
        <div className="flex items-center gap-4 md:gap-8 lg:gap-12">
          <a 
            href="#" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.8125rem'
            }}
          >
            Home
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
          <span className="hidden sm:inline" style={{ color: '#FFFFFF', opacity: 0.2 }}>|</span>
          <a 
            href="#apps" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.8125rem'
            }}
          >
            Apps
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
          <span className="hidden sm:inline" style={{ color: '#FFFFFF', opacity: 0.2 }}>|</span>
          <button
            onClick={onNewsClick}
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.8125rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            News
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </button>
          <span className="hidden sm:inline" style={{ color: '#FFFFFF', opacity: 0.2 }}>|</span>
          <a 
            href="#about" 
            className="uppercase relative group" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.8125rem'
            }}
          >
            About
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
          <span className="hidden sm:inline" style={{ color: '#FFFFFF', opacity: 0.2 }}>|</span>
          <a 
            href="#contact" 
            className="uppercase relative group mr-4" 
            style={{ 
              color: '#FFFFFF', 
              fontFamily: 'IBM Plex Mono, monospace', 
              letterSpacing: '0.08em',
              fontSize: '0.8125rem'
            }}
          >
            Contact
            <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
          </a>
        </div>

        {/* Right Account Section */}
        <div className="w-48 flex justify-end items-center relative" ref={menuRef}>
          {userEmail ? (
            <>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 group transition-opacity hover:opacity-80"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center overflow-hidden bg-white shrink-0"
                  style={{ boxShadow: '0 0 0 2px #000000, 0 0 0 3px #FFFFFF' }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1744740606260-1881836349d2?q=80&w=100&h=100&auto=format&fit=crop"
                    alt="User"
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="text-left hidden xl:block overflow-hidden">
                  <div className="flex items-center gap-1">
                    <span 
                      className="uppercase leading-none mb-1 block truncate"
                      style={{ 
                        color: '#FFFFFF', 
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Member
                    </span>
                    <ChevronDown size={12} className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div 
                    className="leading-none opacity-50 block truncate max-w-[100px]"
                    style={{ 
                      color: '#FFFFFF', 
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.625rem'
                    }}
                  >
                    {userEmail.split('@')[0]}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-56 border-2 border-white bg-black p-2 z-[60]"
                    style={{ boxShadow: '8px 8px 0 rgba(255,255,255,0.1)' }}
                  >
                    <div className="px-3 py-2 border-b border-white/10 mb-2">
                      <div className="text-[10px] uppercase opacity-40 font-mono mb-1 text-white">Signed in as</div>
                      <div className="text-xs font-mono text-white truncate">{userEmail}</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        onProfileClick?.();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white hover:text-black transition-colors font-mono text-xs uppercase"
                    >
                      <User size={14} />
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        onLogout?.();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white hover:text-black transition-colors font-mono text-xs uppercase mt-1"
                    >
                      <LogOut size={14} />
                      Terminate Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="uppercase px-4 py-2 border-2 border-white transition-all hover:bg-white hover:text-black" 
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'IBM Plex Mono, monospace', 
                letterSpacing: '0.1em',
                fontSize: '0.75rem',
                fontWeight: '700',
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