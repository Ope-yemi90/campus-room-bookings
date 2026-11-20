"use client";

import Link from "next/link";
import { useState } from "react";
import { rooms } from "../data";
import { useBookings } from "../booking-context";

function formatBookingDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function MyBookingsPage() {
  const { bookings, isReady, cancelBooking } = useBookings();
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const sortedBookings = [...bookings].sort((first, second) =>
    `${first.date} ${first.time}`.localeCompare(`${second.date} ${second.time}`),
  );

  function handleCancel(bookingId: string, roomName: string) {
    cancelBooking(bookingId);
    setBookingToCancel(null);
    setMessage(`Your booking for ${roomName} was cancelled.`);
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
          <Link href="/" className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-brand-deep transition hover:bg-brand-blush hover:text-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
            Browse Rooms
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <p className="text-sm font-semibold text-brand-primary">Your study plans</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">My Bookings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-charcoal/70 sm:text-base">
            Review your room reservations and manage your upcoming study sessions.
          </p>
        </div>

        {message && (
          <p role="status" className="mb-6 rounded-xl border border-brand-rose/40 bg-brand-blush px-4 py-3 text-sm font-medium text-brand-deep">
            {message}
          </p>
        )}

        {!isReady ? (
          <div className="rounded-2xl border border-brand-blush bg-white px-6 py-12 text-center text-sm text-charcoal/70" role="status">
            Loading your bookings…
          </div>
        ) : sortedBookings.length === 0 ? (
          <section className="rounded-2xl border border-brand-blush bg-white px-6 py-12 text-center shadow-[0_5px_24px_rgba(84,32,45,0.06)] sm:px-12 sm:py-16">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blush text-brand-deep" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                <path d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="mt-5 text-xl font-semibold text-charcoal">No bookings yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-charcoal/70">
              Your room reservations will show up here. Find a space that suits your next study session.
            </p>
            <Link href="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-brand-primary px-5 text-sm font-semibold text-white transition hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary">
              Browse Rooms
            </Link>
          </section>
        ) : (
          <div className="space-y-5">
            {sortedBookings.map((booking) => {
              const room = rooms.find((item) => item.id === booking.roomId);
              const roomName = room?.name ?? "Campus room";
              const building = room?.building ?? "Building information unavailable";

              return (
                <article key={booking.id} className="rounded-2xl border border-brand-blush bg-white p-5 shadow-[0_5px_24px_rgba(84,32,45,0.06)] sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-brand-primary">Room reservation</p>
                      <h2 className="mt-1 text-xl font-semibold leading-snug text-charcoal">{roomName}</h2>
                      <p className="mt-1 flex items-center gap-2 text-sm text-charcoal/70">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true">
                          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.7" />
                          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                        </svg>
                        {building}
                      </p>
                    </div>

                    {bookingToCancel === booking.id ? (
                      <div className="w-full rounded-xl border border-brand-rose/40 bg-brand-blush p-4 sm:max-w-xs" role="group" aria-label={`Confirm cancellation for ${roomName}`}>
                        <p className="text-sm font-semibold text-brand-deep">Cancel this booking?</p>
                        <p className="mt-1 text-xs leading-5 text-brand-deep">This will remove the reservation from your list.</p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => handleCancel(booking.id, roomName)}
                            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-primary px-3 text-xs font-semibold text-white transition hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                          >
                            Confirm cancellation
                          </button>
                          <button
                            type="button"
                            onClick={() => setBookingToCancel(null)}
                            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand-rose/50 bg-white px-3 text-xs font-semibold text-brand-deep transition hover:bg-brand-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
                          >
                            Keep booking
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setMessage("");
                          setBookingToCancel(booking.id);
                        }}
                        className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg border border-brand-rose/50 px-4 text-sm font-semibold text-brand-deep transition hover:bg-brand-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary sm:w-auto"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>

                  <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-brand-blush pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/75">Date</dt>
                      <dd className="mt-1 text-sm font-medium text-charcoal">{formatBookingDate(booking.date)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/75">Time</dt>
                      <dd className="mt-1 text-sm font-medium text-charcoal">{booking.time}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/75">Student</dt>
                      <dd className="mt-1 text-sm font-medium text-charcoal">{booking.studentName}</dd>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-charcoal/75">Purpose</dt>
                      <dd className="mt-1 break-words text-sm leading-5 text-charcoal [overflow-wrap:anywhere]">{booking.purpose}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
