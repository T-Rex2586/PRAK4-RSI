import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <main className="flex-1 flex items-center relative overflow-hidden">
        <div className="absolute w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] top-[-80px] right-[-60px] pointer-events-none" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.10)_0%,transparent_70%)] bottom-0 left-[30%] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32 w-full">

          <h1 className="font-display text-5xl sm:text-6xl lg:text-[72px] leading-[1.08] text-zinc-900 mb-6 max-w-2xl">
            Moments worth<br />
            <span className="italic gradient-text">
              remembering.
            </span>
          </h1>

          <p className="font-body text-base text-zinc-500 max-w-md leading-relaxed mb-10">
            Discover and join curated events.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <Link href="/events" className="btn-primary hover:opacity-90 hover:-translate-y-px">
              Browse Events
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/register" className="btn-secondary hover:bg-indigo-50 hover:border-indigo-500 hover:-translate-y-px">
              Create Account
            </Link>
          </div>

        </div>
      </main>

      <footer className="border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="nav-logo !text-lg">EventApp</span>
          <p className="font-body text-xs text-zinc-400">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}