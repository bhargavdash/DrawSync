const PRESENCE = [
  { name: 'You', color: 'var(--color-accent)', status: 'drawing a rectangle' },
  { name: 'Maya', color: 'var(--color-pen-amber)', status: 'idle, cursor at (270, 85)' },
  { name: 'Theo', color: 'var(--color-pen-coral)', status: 'drawing a freehand line' },
];

const CollaborationSection = () => {
  return (
    <section id="collaboration" className="py-28 bg-(--color-surface-recessed) border-t border-(--color-line-soft)">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="font-semibold tracking-tight text-(--color-ink) text-balance"
              style={{ fontSize: 'clamp(2rem, 1.6rem + 1.6vw, 3rem)', lineHeight: 1.1 }}
            >
              Nobody waits for a merge
            </h2>
            <p className="mt-5 text-(--color-ink-muted) leading-relaxed">
              Every stroke is published the instant it&rsquo;s drawn and fanned out
              to everyone else in the room over Redis pub/sub — not polled,
              not batched. Join a room and the last 50 strokes replay before
              you&rsquo;ve finished reading the URL.
            </p>
            <p className="mt-4 text-(--color-ink-muted) leading-relaxed">
              Room membership is tracked per server instance and synced
              through the same pub/sub channel, so the architecture already
              holds up across more than one WebSocket process — the part
              most weekend real-time projects skip.
            </p>
          </div>

          <div className="rounded-lg border border-(--color-line) bg-(--color-bg) overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-(--color-line-soft)">
              <span className="font-(family-name:--font-mono-readout) text-xs text-(--color-ink-muted)">
                room · wireframe-review
              </span>
              <span className="font-(family-name:--font-mono-readout) text-xs text-(--color-accent)">
                3 online
              </span>
            </div>
            <ul>
              {PRESENCE.map((p) => (
                <li
                  key={p.name}
                  className="flex items-center gap-3 px-5 py-4 border-b border-(--color-line-soft) last:border-b-0"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: p.color }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-(--color-ink) font-medium w-14 shrink-0">{p.name}</span>
                  <span className="text-sm text-(--color-ink-muted)">{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
