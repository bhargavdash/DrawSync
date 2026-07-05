const SPECS = [
  {
    n: '01',
    title: 'Multi-server fanout',
    detail:
      "Room membership and every stroke are published through Redis pub/sub, so state stays consistent across multiple WebSocket server instances — not just one process handling every connection.",
  },
  {
    n: '02',
    title: 'Persistence off the hot path',
    detail:
      'Each stroke is queued and drained to Postgres asynchronously. A slow database write never blocks the broadcast to everyone else already in the room.',
  },
  {
    n: '03',
    title: 'Hand-rolled canvas engine',
    detail:
      'No fabric.js, no Konva. Shape hit-testing, undo/redo history, zoom-to-cursor, and PNG/JSON export are built directly on the 2D canvas context.',
  },
  {
    n: '04',
    title: 'Gated at the handshake',
    detail: 'Every WebSocket connection carries a JWT, verified before a room join is ever accepted.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 border-t border-(--color-line-soft)">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
          <div>
            <h2
              className="font-semibold tracking-tight text-(--color-ink) text-balance"
              style={{ fontSize: 'clamp(2rem, 1.6rem + 1.6vw, 3rem)', lineHeight: 1.1 }}
            >
              Built like an instrument, not a demo
            </h2>
            <p className="mt-5 text-(--color-ink-muted) leading-relaxed max-w-sm">
              The parts underneath the canvas — the pieces that make
              &ldquo;multiple people, one live sheet&rdquo; actually hold up.
            </p>
          </div>

          <dl className="border-t border-(--color-line-soft)">
            {SPECS.map((spec) => (
              <div
                key={spec.n}
                className="grid grid-cols-[3rem_1fr] gap-6 py-7 border-b border-(--color-line-soft)"
              >
                <dt className="font-(family-name:--font-mono-readout) text-sm text-(--color-accent) pt-0.5">
                  {spec.n}
                </dt>
                <dd>
                  <p className="font-medium text-(--color-ink)">{spec.title}</p>
                  <p className="mt-1.5 text-sm text-(--color-ink-muted) leading-relaxed max-w-xl">
                    {spec.detail}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
