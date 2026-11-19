export default function HeroBackground() {
  return (
    <div className="framer-10v1r6k-container">
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            backgroundSize: '256px 256px',
            backgroundRepeat: 'repeat',
            background: "url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')",
            opacity: '0.8',
            inset: '-200%',
            width: '400%',
            height: '400%',
            position: 'absolute',
          }}
        />
      </div>
    </div>
  );
}
