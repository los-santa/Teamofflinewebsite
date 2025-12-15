export default function Footer() {
  const socialLinks = [
    { name: 'INSTAGRAM', href: 'https://www.instagram.com/teamoffline.archivelab/' },
    { name: 'EMAIL', href: 'mailto:team.offline.essential@gmail.com' }
  ];

  return (
    <footer 
      className="mt-32 py-24" 
      style={{ 
        backgroundColor: '#2A2A2A',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)'
      }}
    >
      <div className="text-center">
        <p 
          className="mb-2 uppercase" 
          style={{ 
            color: '#FFFFFF', 
            fontFamily: 'League Spartan, sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '0.1em',
            fontWeight: '700'
          }}
        >
          Team Offline
        </p>
        
        <p 
          className="mb-1 uppercase" 
          style={{ 
            color: '#FFFFFF', 
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            opacity: 0.6
          }}
        >
          Made in Busan
        </p>

        <p 
          className="mb-12" 
          style={{ 
            color: '#FFFFFF', 
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.875rem',
            opacity: 0.8
          }}
        >
          team.offline.essential@gmail.com
        </p>

        <div className="flex justify-center items-center gap-12 mb-16">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="uppercase relative group"
              style={{ 
                color: '#FFFFFF', 
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.875rem',
                letterSpacing: '0.08em'
              }}
            >
              {link.name}
              <span className="absolute bottom-[-2px] left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: '#FFFFFF' }} />
            </a>
          ))}
        </div>

        <p 
          className="uppercase" 
          style={{ 
            color: '#FFFFFF', 
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.625rem',
            letterSpacing: '0.12em',
            opacity: 0.5
          }}
        >
          ©2025 Team Offline — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}