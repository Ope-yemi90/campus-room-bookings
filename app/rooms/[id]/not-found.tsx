import Link from "next/link";

export default function RoomNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8fa] px-5 py-12 text-center text-[#102b46]">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200/80 bg-white p-8 shadow-[0_8px_32px_rgba(16,43,70,0.07)] sm:p-12">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-800" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path d="M4 20h16M6 20V9l6-4 6 4v11M9 20v-6h6v6M3 9l9-6 9 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">Room not found</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">We couldn’t find that room</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
          That room may have been removed, or the link may be incorrect. Browse the available campus spaces to find another one.
        </p>
        <Link href="/" className="mt-7 inline-flex h-11 items-center justify-center rounded-lg bg-[#102b46] px-5 text-sm font-semibold text-white transition hover:bg-[#183d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
          Back to rooms
        </Link>
      </section>
    </main>
  );
}
