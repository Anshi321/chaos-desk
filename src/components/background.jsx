const ICONS = ['🐛', '🪲', '☕', '💥', '🐞', '📧', '⏰', '🦟'];

export default function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-stars" />
      <div className="bg-grid" />
      {ICONS.map((icon, i) => (
        <span
          key={i}
          className="float"
          style={{
            left: `${(i * 13 + 7) % 92}%`,
            animationDuration: `${16 + (i % 4) * 4}s`,
            animationDelay: `-${i * 2.7}s`,
            fontSize: `${1.4 + (i % 3) * 0.6}rem`,
          }}
        >
          {icon}
        </span>
      ))}
    </div>
  );
}
