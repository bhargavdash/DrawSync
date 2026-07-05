import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-(--color-bg) text-(--color-ink)">
      <header className="py-5 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="9.5" stroke="var(--color-line)" strokeWidth="1" />
            <path
              d="M4 14.5 L9 6.5 L13 12 L18 5"
              stroke="var(--color-accent)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[1.05rem] font-semibold tracking-tight">DrawSync</span>
        </Link>
        <Link href="/" className="text-sm text-(--color-ink-muted) hover:text-(--color-ink) transition-colors">
          Back to home
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="max-w-sm w-full">
          <div className="bg-(--color-surface-recessed) p-8 rounded-lg border border-(--color-line)">
            <div className="mb-7">
              <h1 className="text-xl font-semibold text-(--color-ink)">{title}</h1>
              <p className="mt-1.5 text-sm text-(--color-ink-muted)">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 text-center text-(--color-ink-muted) text-xs">
        © {new Date().getFullYear()} DrawSync
      </footer>
    </div>
  );
}
