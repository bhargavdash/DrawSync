import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-(--color-line-soft)">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-(--color-ink-muted)">
          <span className="text-(--color-ink) font-medium">DrawSync</span>
          <span aria-hidden="true">·</span>
          <span>built by Bhargav Dash</span>
        </div>

        <a
          href="https://github.com/bhargavdash/drawsync"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sm text-(--color-ink-muted) hover:text-(--color-ink) transition-colors"
        >
          <Github className="w-4 h-4" aria-hidden="true" />
          Source on GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
