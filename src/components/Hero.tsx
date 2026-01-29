import { ImageWithFallback } from './figma/ImageWithFallback';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-16 py-24 relative overflow-hidden bg-black">
      <div className="mb-12 relative">
        {/* 1930s Milk Cap Style Logo Container */}
        <div 
          className="relative flex items-center justify-center transition-all duration-700 hover:scale-105"
          style={{
            padding: '32px',
            border: '4px solid #FFFFFF',
            boxShadow: 'inset 0 0 0 10px #000000, inset 0 0 0 14px #FFFFFF, 0 0 40px rgba(255,255,255,0.1)',
            minHeight: '320px',
            minWidth: '320px',
            borderRadius: '50%', // Circle like a milk cap
            backgroundColor: '#000000'
          }}
        >
          <div className="w-56 h-56 rounded-full overflow-hidden flex items-center justify-center bg-white p-4">
            <ImageWithFallback
              src="https://teamoffline-homepage-assets.vercel.app/fulllogo.png"
              alt="TEAM Offline Logo"
              className="w-full h-full object-contain grayscale brightness-90 contrast-125"
            />
          </div>
          
          {/* Circular Text Border (Milk Cap Aesthetic) */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 320 320">
              <path
                id="curve"
                d="M 160, 160 m -130, 0 a 130,130 0 1,1 260,0 a 130,130 0 1,1 -260,0"
                fill="transparent"
              />
              <text className="fill-white font-mono text-[10px] uppercase tracking-[0.4em]">
                <textPath xlinkHref="#curve" startOffset="0%">
                  • TEAM OFFLINE • EST 1930 • PERSONAL DATABASE • ORIGINAL QUALITY •
                </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center space-y-6">
        <h1 
          className="text-6xl md:text-8xl font-league uppercase leading-none tracking-tighter text-white"
          style={{ letterSpacing: '-0.04em' }}
        >
          TEAM Offline
        </h1>
        
        <p 
          className="uppercase max-w-2xl mx-auto leading-relaxed" 
          style={{ 
            color: '#FFFFFF', 
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.875rem',
            letterSpacing: '0.15em',
            opacity: 0.6
          }}
        >
          PRESERVING DATA INTEGRITY THROUGH RIGOROUS ARCHIVAL STANDARDS.
        </p>
        
        <div className="flex justify-center pt-4">
          <div 
            className="w-32 h-px" 
            style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
          />
        </div>
      </div>
    </section>
  );
}