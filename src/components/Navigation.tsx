interface NavigationProps {
  onNewsClick?: () => void;
}

export default function Navigation({ onNewsClick }: NavigationProps) {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-12 py-5"
      style={{ 
        backgroundColor: '#3D2F2A',
        borderBottom: '1px solid rgba(245, 230, 211, 0.15)'
      }}
    >
      <div className="flex justify-center items-center gap-12">
        <a 
          href="#" 
          className="uppercase relative group" 
          style={{ 
            color: '#F5E6D3', 
            fontFamily: 'IBM Plex Mono, monospace', 
            letterSpacing: '0.08em',
            fontSize: '0.875rem'
          }}
        >
          Home
          <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F5E6D3' }} />
        </a>
        <span style={{ color: '#F5E6D3', opacity: 0.3 }}>|</span>
        <a 
          href="#apps" 
          className="uppercase relative group" 
          style={{ 
            color: '#F5E6D3', 
            fontFamily: 'IBM Plex Mono, monospace', 
            letterSpacing: '0.08em',
            fontSize: '0.875rem'
          }}
        >
          Apps
          <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F5E6D3' }} />
        </a>
        <span style={{ color: '#F5E6D3', opacity: 0.3 }}>|</span>
        <a 
          href="#videos" 
          className="uppercase relative group" 
          style={{ 
            color: '#F5E6D3', 
            fontFamily: 'IBM Plex Mono, monospace', 
            letterSpacing: '0.08em',
            fontSize: '0.875rem'
          }}
        >
          Videos
          <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F5E6D3' }} />
        </a>
        <span style={{ color: '#F5E6D3', opacity: 0.3 }}>|</span>
        <button
          onClick={onNewsClick}
          className="uppercase relative group" 
          style={{ 
            color: '#F5E6D3', 
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
          <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F5E6D3' }} />
        </button>
        <span style={{ color: '#F5E6D3', opacity: 0.3 }}>|</span>
        <a 
          href="#about" 
          className="uppercase relative group" 
          style={{ 
            color: '#F5E6D3', 
            fontFamily: 'IBM Plex Mono, monospace', 
            letterSpacing: '0.08em',
            fontSize: '0.875rem'
          }}
        >
          About
          <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F5E6D3' }} />
        </a>
        <span style={{ color: '#F5E6D3', opacity: 0.3 }}>|</span>
        <a 
          href="#contact" 
          className="uppercase relative group" 
          style={{ 
            color: '#F5E6D3', 
            fontFamily: 'IBM Plex Mono, monospace', 
            letterSpacing: '0.08em',
            fontSize: '0.875rem'
          }}
        >
          Contact
          <span className="absolute bottom-[-4px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#F5E6D3' }} />
        </a>
      </div>
    </nav>
  );
}
