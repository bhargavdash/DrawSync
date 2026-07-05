import Link from 'next/link';

const LiveCanvasScene = () => (
  <div className="relative aspect-4/3 rounded-lg border border-(--color-line) bg-(--color-surface-recessed) blueprint-grid-fine overflow-hidden">
    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-(--color-bg)/70 backdrop-blur-sm px-2.5 py-1 border border-(--color-line-soft)">
      <span className="w-1.5 h-1.5 rounded-full bg-(--color-accent) animate-pulse" />
      <span className="font-(family-name:--font-mono-readout) text-[0.65rem] text-(--color-ink-muted)">
        3 drawing now
      </span>
    </div>

    <svg viewBox="0 0 400 300" className="w-full h-full" aria-hidden="true">
      <rect
        x="40"
        y="40"
        width="120"
        height="90"
        rx="4"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeDasharray="420"
        strokeDashoffset="420"
        className="draw-path"
        style={{ animationDelay: '0.2s' }}
      />
      <circle
        cx="270"
        cy="85"
        r="45"
        fill="none"
        stroke="var(--color-pen-amber)"
        strokeWidth="2"
        strokeDasharray="283"
        strokeDashoffset="283"
        className="draw-path"
        style={{ animationDelay: '0.9s' }}
      />
      <path
        d="M40 220 Q 130 180 200 210 T 340 190"
        fill="none"
        stroke="var(--color-pen-coral)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="330"
        strokeDashoffset="330"
        className="draw-path"
        style={{ animationDelay: '1.5s' }}
      />

      <g className="cursor-drift" style={{ animationDelay: '0s' }}>
        <path d="M162 42 L162 58 L167 53 L171 61 L174 59 L170 51 L177 51 Z" fill="var(--color-accent)" />
        <rect x="180" y="42" width="28" height="14" rx="3" fill="var(--color-accent)" />
        <text x="184" y="52" fontSize="8" fill="var(--color-bg)" fontFamily="var(--font-mono-readout)">
          you
        </text>
      </g>

      <g className="cursor-drift" style={{ animationDelay: '1.3s' }}>
        <path d="M295 50 L295 66 L300 61 L304 69 L307 67 L303 59 L310 59 Z" fill="var(--color-pen-amber)" />
        <rect x="313" y="50" width="32" height="14" rx="3" fill="var(--color-pen-amber)" />
        <text x="317" y="60" fontSize="8" fill="var(--color-bg)" fontFamily="var(--font-mono-readout)">
          maya
        </text>
      </g>

      <g className="cursor-drift" style={{ animationDelay: '2.4s' }}>
        <path d="M205 195 L205 211 L210 206 L214 214 L217 212 L213 204 L220 204 Z" fill="var(--color-pen-coral)" />
        <rect x="223" y="195" width="30" height="14" rx="3" fill="var(--color-pen-coral)" />
        <text x="227" y="205" fontSize="8" fill="var(--color-bg)" fontFamily="var(--font-mono-readout)">
          theo
        </text>
      </g>
    </svg>
  </div>
);

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden blueprint-grid">
      <div className="relative max-w-6xl mx-auto px-6 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <div>
            <h1
              className="font-semibold tracking-tight text-(--color-ink) text-balance"
              style={{ fontSize: 'clamp(2.75rem, 2rem + 3.5vw, 5rem)', lineHeight: 1.05 }}
            >
              One sheet.
              <br />
              Every pen moving at once.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-(--color-ink-muted) leading-relaxed">
              DrawSync is a real-time canvas where a room full of people draw
              on the same surface simultaneously — every stroke synced the
              instant it&rsquo;s made, no refresh, no merge conflicts.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="px-6 py-3 rounded-md bg-(--color-accent) text-(--color-bg) font-medium text-base hover:brightness-110 transition-[filter] text-center"
              >
                Open the canvas
              </Link>
              <Link
                href="/signin"
                className="px-6 py-3 rounded-md border border-(--color-line) text-(--color-ink) font-medium text-base hover:bg-(--color-surface) transition-colors text-center"
              >
                Sign in
              </Link>
            </div>

            <p className="mt-8 font-(family-name:--font-mono-readout) text-xs text-(--color-ink-muted) tracking-wide">
              WebSocket · Redis pub/sub fanout · hand-rolled canvas engine
            </p>
          </div>

          <LiveCanvasScene />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
