export default function LoadingSpinner({ size = 40 }: { size?: number }) {
  return (
    <div 
      className="inline-block"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: '3px solid rgba(245, 230, 211, 0.3)',
        borderTopColor: '#F5E6D3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    >
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
