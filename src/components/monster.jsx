export default function Monster({ type = 'demon', className = '' }) {
  if (type === 'inbox') {
    return (
      <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="gInbox" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#19f0ff" />
            <stop offset="1" stopColor="#8b5cff" />
          </linearGradient>
        </defs>
        <path d="M30 120 Q5 130 15 160" stroke="#8b5cff" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M170 120 Q195 130 185 160" stroke="#8b5cff" strokeWidth="12" fill="none" strokeLinecap="round" />
        <rect x="30" y="50" width="140" height="110" rx="18" fill="url(#gInbox)" />
        <path d="M30 62 L100 112 L170 62" stroke="#0b0b1a" strokeWidth="6" fill="none" strokeLinejoin="round" opacity="0.35" />
        <circle cx="62" cy="88" r="14" fill="#fff" /><circle cx="66" cy="90" r="6" fill="#111" />
        <circle cx="100" cy="78" r="17" fill="#fff" /><circle cx="100" cy="81" r="7" fill="#111" />
        <circle cx="138" cy="88" r="14" fill="#fff" /><circle cx="134" cy="90" r="6" fill="#111" />
        <path d="M60 130 L72 142 L84 130 L96 142 L108 130 L120 142 L132 130 L140 138" stroke="#2a0a1a" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="160" cy="48" r="16" fill="#ff2e97" />
        <text x="160" y="54" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff" fontFamily="Fredoka, sans-serif">99+</text>
      </svg>
    );
  }

  if (type === 'bug') {
    return (
      <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <radialGradient id="gBug" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0" stopColor="#d6ff7a" />
            <stop offset="1" stopColor="#3fb618" />
          </radialGradient>
        </defs>
        <g stroke="#2a7a10" strokeWidth="8" strokeLinecap="round" fill="none">
          <path d="M45 105 L12 90" /><path d="M42 125 L10 130" /><path d="M52 148 L25 172" />
          <path d="M155 105 L188 90" /><path d="M158 125 L190 130" /><path d="M148 148 L175 172" />
          <path d="M80 50 Q70 20 50 14" /><path d="M120 50 Q130 20 150 14" />
        </g>
        <circle cx="50" cy="14" r="7" fill="#ffd400" /><circle cx="150" cy="14" r="7" fill="#ffd400" />
        <ellipse cx="100" cy="112" rx="62" ry="64" fill="url(#gBug)" />
        <circle cx="75" cy="145" r="9" fill="#2a7a10" opacity="0.5" />
        <circle cx="130" cy="150" r="7" fill="#2a7a10" opacity="0.5" />
        <circle cx="100" cy="165" r="6" fill="#2a7a10" opacity="0.5" />
        <circle cx="76" cy="90" r="20" fill="#fff" /><circle cx="124" cy="90" r="20" fill="#fff" />
        <circle cx="80" cy="94" r="9" fill="#111" /><circle cx="120" cy="94" r="9" fill="#111" />
        <path d="M78 125 Q100 145 122 125" stroke="#1a3a0a" strokeWidth="7" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // default: demon
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="gDemon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5fb0" />
          <stop offset="1" stopColor="#c0126a" />
        </linearGradient>
      </defs>
      <path d="M45 78 L55 12 L92 58 Z" fill="#ffd400" />
      <path d="M155 78 L145 12 L108 58 Z" fill="#ffd400" />
      <ellipse cx="100" cy="118" rx="72" ry="68" fill="url(#gDemon)" />
      <circle cx="72" cy="102" r="19" fill="#fff" /><circle cx="128" cy="102" r="19" fill="#fff" />
      <circle cx="78" cy="106" r="8" fill="#111" /><circle cx="122" cy="106" r="8" fill="#111" />
      <path d="M48 76 L92 94" stroke="#2a0a1a" strokeWidth="8" strokeLinecap="round" />
      <path d="M152 76 L108 94" stroke="#2a0a1a" strokeWidth="8" strokeLinecap="round" />
      <path d="M55 140 Q100 195 145 140 Z" fill="#2a0a1a" />
      <path d="M68 142 L77 158 L86 144 Z M92 146 L100 163 L108 146 Z M114 144 L123 158 L132 142 Z" fill="#fff" />
      <circle cx="160" cy="165" r="22" fill="#fff" stroke="#2a0a1a" strokeWidth="5" />
      <path d="M160 165 L160 151 M160 165 L170 170" stroke="#2a0a1a" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
