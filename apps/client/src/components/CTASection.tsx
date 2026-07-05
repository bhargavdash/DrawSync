import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-28 border-t border-(--color-line-soft) blueprint-grid">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2
          className="font-semibold tracking-tight text-(--color-ink) text-balance"
          style={{ fontSize: 'clamp(2rem, 1.6rem + 2vw, 3.25rem)', lineHeight: 1.1 }}
        >
          Pick up a pen. Someone else already has.
        </h2>
        <p className="mt-5 text-(--color-ink-muted) text-lg">
          Start a room, share the link, and watch the sheet fill in from both ends at once.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="px-7 py-3 rounded-md bg-(--color-accent) text-(--color-bg) font-medium text-base hover:brightness-110 transition-[filter]"
          >
            Open the canvas
          </Link>
          <Link
            href="/signin"
            className="px-7 py-3 rounded-md border border-(--color-line) text-(--color-ink) font-medium text-base hover:bg-(--color-surface) transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
