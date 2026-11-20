import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms } from "../../data";
import BookingForm from "./booking-form";

// Prebuild a details page for each room in the shared data file.
export function generateStaticParams() {
  return rooms.map((room) => ({ id: String(room.id) }));
}

export default async function RoomDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = rooms.find((item) => String(item.id) === id);

  if (!room) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-brand-cream text-charcoal">
      <header className="border-b border-brand-blush bg-white">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M3 9.5 12 4l9 5.5M5.5 10v8.5M9.75 10v8.5M14.25 10v8.5M18.5 10v8.5M4 20h16M3 22h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight text-brand-primary">UniReserve</span>
          </Link>
          <Link href="/my-bookings" className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-brand-deep transition hover:bg-brand-blush hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
            My Bookings
          </Link>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition hover:text-brand-deep focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary">
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M16 10H4m5 5-5-5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to rooms
        </Link>

        <article className="mt-6 overflow-hidden rounded-2xl border border-brand-blush bg-white shadow-[0_8px_32px_rgba(84,32,45,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-64 bg-brand-cream sm:min-h-80 lg:min-h-[520px]">
              <img
                src={room.image}
                alt={`${room.name} in ${room.building}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-9 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-primary">Room details</p>
              <h1 className="mt-3 break-words text-3xl font-semibold leading-tight tracking-tight text-charcoal sm:text-4xl">{room.name}</h1>

              <dl className="mt-8 grid grid-cols-1 gap-5 border-b border-brand-blush pb-7 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/75">Building</dt>
                  <dd className="mt-1.5 text-base font-medium text-charcoal">{room.building}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-charcoal/75">Capacity</dt>
                  <dd className="mt-1.5 text-base font-medium text-charcoal">{room.capacity} people</dd>
                </div>
              </dl>

              <section className="mt-7" aria-labelledby="amenities-heading">
                <h2 id="amenities-heading" className="text-base font-semibold text-charcoal">Amenities</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="rounded-md bg-brand-blush px-3 py-2 text-sm font-medium text-brand-deep">{amenity}</li>
                  ))}
                </ul>
              </section>

              <section className="mt-8" aria-labelledby="times-heading">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h2 id="times-heading" className="text-base font-semibold text-charcoal">Available time slots</h2>
                    <p className="mt-1 text-sm text-charcoal/70">Open times for this room</p>
                  </div>
                  <span className="rounded-full bg-brand-blush px-3 py-1 text-xs font-semibold text-brand-deep">{room.availableTimeSlots.length} slots</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {room.availableTimeSlots.map((slot) => (
                    <li key={slot.time} className="flex flex-col gap-1 rounded-xl border border-brand-blush px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm font-semibold text-charcoal">{slot.time}</span>
                      <span className="text-sm text-charcoal/70">Up to {slot.maxBookableSeats} bookable seats</span>
                    </li>
                  ))}
                </ul>
              </section>

              <BookingForm
                roomId={room.id}
                roomName={room.name}
                timeSlots={room.availableTimeSlots}
              />
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
