import Link from "next/link";
import { rooms } from "./data";

function CampusMark() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-sm shadow-teal-900/10">
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
        <path d="M3 9.5 12 4l9 5.5M5.5 10v8.5M9.75 10v8.5M14.25 10v8.5M18.5 10v8.5M4 20h16M3 22h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8fa] text-[#102b46]">
      <header className="border-b border-slate-200/80 bg-white">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600">
            <CampusMark />
            <span className="text-lg font-bold tracking-tight text-[#102b46]">CampusSpace</span>
          </Link>
          <Link href="/my-bookings" className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#102b46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
            My Bookings
          </Link>
        </nav>
      </header>

      <section className="relative isolate overflow-hidden bg-[#102b46]">
        <div className="absolute inset-0 -z-10 opacity-20" aria-hidden="true">
          <div className="absolute -right-20 -top-44 h-[28rem] w-[28rem] rounded-full border border-teal-200/50" />
          <div className="absolute -right-4 -top-28 h-[22rem] w-[22rem] rounded-full border border-teal-200/40" />
          <div className="absolute -bottom-40 right-1/4 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-200">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
            Your campus, your space
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
            Find Your Perfect Study Space
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            From quiet library corners to collaborative project rooms, find a place that fits the way you study.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16" aria-labelledby="rooms-heading">
        <div className="mb-8 flex flex-col gap-2 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">Explore campus spaces</p>
            <h2 id="rooms-heading" className="mt-1 text-2xl font-semibold tracking-tight text-[#102b46] sm:text-3xl">Rooms for every kind of study</h2>
          </div>
          <p className="text-sm text-slate-500">{rooms.length} spaces to explore</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rooms.map((room) => {
            const isAvailable = room.availableTimeSlots.some((slot) => slot.maxBookableSeats > 0);

            return (
              <article key={room.id} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_5px_24px_rgba(16,43,70,0.045)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(16,43,70,0.11)]">
                <div className="relative h-52 overflow-hidden bg-slate-100 sm:h-56">
                  <img
                    src={room.image}
                    alt={`${room.name} in ${room.building}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <span className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${isAvailable ? "bg-white text-emerald-800" : "bg-white text-slate-600"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {isAvailable ? "Available" : "Fully booked"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="break-words text-lg font-semibold leading-snug text-[#102b46]">{room.name}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true">
                      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.7" />
                      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                    </svg>
                    {room.building}
                  </p>

                  <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px] text-teal-700" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m16 0v-2a4 4 0 0 0-3-3.87M14 3.13a4 4 0 0 1 0 7.75M10 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span><span className="font-semibold text-[#102b46]">{room.capacity}</span> people capacity</span>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <span key={amenity} className="rounded-md bg-[#f1f6f7] px-2.5 py-1.5 text-xs font-medium text-slate-600">{amenity}</span>
                      ))}
                    </div>
                  </div>

                  <Link href={`/rooms/${room.id}`} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#102b46] px-4 text-sm font-semibold text-white transition hover:bg-[#183d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                    View Details
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-slate-400 sm:px-8 lg:px-10">
          CampusSpace · Find room to focus.
        </div>
      </footer>
    </main>
  );
}
