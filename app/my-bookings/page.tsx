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
    <main className="min-h-screen bg-[#f5f8fa] text-[#102b46]">
      <header className="border-b border-slate-200/80 bg-white">
        <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-600">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M3 9.5 12 4l9 5.5M5.5 10v8.5M9.75 10v8.5M14.25 10v8.5M18.5 10v8.5M4 20h16M3 22h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-lg font-bold tracking-tight">CampusSpace</span>
          </Link>
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#102b46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
            Browse Rooms
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <p className="text-sm font-semibold text-teal-700">Your study plans</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#102b46] sm:text-4xl">My Bookings</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Review your room reservations and manage your upcoming study sessions.
          </p>
        </div>

        {message && (
          <p role="status" className="mb-6 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-medium text-teal-900">
            {message}
          </p>
        )}

        {!isReady ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500" role="status">
            Loading your bookings…
          </div>
        ) : sortedBookings.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_5px_24px_rgba(16,43,70,0.045)] sm:px-12 sm:py-16">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-800" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                <path d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h2 className="mt-5 text-xl font-semibold text-[#102b46]">No bookings yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Your room reservations will show up here. Find a space that suits your next study session.
            </p>
            <Link href="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#102b46] px-5 text-sm font-semibold text-white transition hover:bg-[#183d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
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
                <article key={booking.id} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_5px_24px_rgba(16,43,70,0.045)] sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-teal-700">Room reservation</p>
                      <h2 className="mt-1 text-xl font-semibold leading-snug text-[#102b46]">{roomName}</h2>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true">
                          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.7" />
                          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                        </svg>
                        {building}
                      </p>
                    </div>

                    {bookingToCancel === booking.id ? (
                      <div className="w-full rounded-xl border border-amber-200 bg-amber-50 p-4 sm:max-w-xs" role="group" aria-label={`Confirm cancellation for ${roomName}`}>
                        <p className="text-sm font-semibold text-amber-950">Cancel this booking?</p>
                        <p className="mt-1 text-xs leading-5 text-amber-900">This will remove the reservation from your list.</p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => handleCancel(booking.id, roomName)}
                            className="inline-flex h-9 items-center justify-center rounded-lg bg-[#102b46] px-3 text-xs font-semibold text-white transition hover:bg-[#183d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                          >
                            Confirm cancellation
                          </button>
                          <button
                            type="button"
                            onClick={() => setBookingToCancel(null)}
                            className="inline-flex h-9 items-center justify-center rounded-lg border border-amber-300 bg-white px-3 text-xs font-semibold text-amber-950 transition hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
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
                        className="inline-flex h-10 w-full shrink-0 items-center justify-center rounded-lg border border-rose-200 px-4 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:w-auto"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>

                  <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Date</dt>
                      <dd className="mt-1 text-sm font-medium text-slate-700">{formatBookingDate(booking.date)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Time</dt>
                      <dd className="mt-1 text-sm font-medium text-slate-700">{booking.time}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Student</dt>
                      <dd className="mt-1 text-sm font-medium text-slate-700">{booking.studentName}</dd>
                    </div>
                    <div className="sm:col-span-2 lg:col-span-1">
                      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Purpose</dt>
                      <dd className="mt-1 break-words text-sm leading-5 text-slate-700">{booking.purpose}</dd>
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
