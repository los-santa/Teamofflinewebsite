import logoImage from 'figma:asset/1b281f2f091024b09cf1902de8f87fc1782862c0.png';

export default function Hero() {

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-16 py-24">
      <div className="mb-8">
        <div 
          className="relative"
          style={{
            padding: '24px',
            border: '3px solid #F5E6D3',
            boxShadow: 'inset 0 0 0 8px #3D2F2A, inset 0 0 0 10px #F5E6D3'
          }}
        >
          <img
            src={logoImage}
            alt="Team Offline Logo"
            className="w-auto h-48 mx-auto block"
            style={{ display: 'block' }}
          />
        </div>
      </div>
      <p 
        className="mb-6 uppercase max-w-4xl mx-auto text-center" 
        style={{ 
          color: '#F5E6D3', 
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '0.875rem',
          letterSpacing: '0.12em',
          opacity: 0.8
        }}
      >
        Personal database company.
      </p>
      <div 
        className="w-24 h-px" 
        style={{ backgroundColor: '#F5E6D3' }}
      />
    </section>
  );
}
