"use client";

import { useState, type FormEvent } from "react";
import { useBookings } from "../../booking-context";
import { getAvailableTimeSlots, isPastBookingDate } from "../../booking-utils";

type TimeSlot = {
  time: string;
  maxBookableSeats: number;
};

type BookingFormProps = {
  roomId: number;
  roomName: string;
  timeSlots: TimeSlot[];
};

function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingForm({ roomId, roomName, timeSlots }: BookingFormProps) {
  const { bookings, isReady, createBooking } = useBookings();
  const [isOpen, setIsOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  // Recalculate when a booking is added, so filled slots disappear from the list.
  const availableSlots = getAvailableTimeSlots(timeSlots, bookings, roomId, date);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!event.currentTarget.reportValidity()) {
      return;
    }

    if (!isReady) {
      setMessageIsError(true);
      setMessage("Your saved bookings are still loading. Please try again in a moment.");
      return;
    }

    if (!studentName.trim() || !studentEmail.trim() || !date || !time || !purpose.trim()) {
      setMessageIsError(true);
      setMessage("Please complete every field before submitting.");
      return;
    }

    if (isPastBookingDate(date, getToday())) {
      setMessageIsError(true);
      setMessage("Please choose today or a future date.");
      return;
    }

    const selectedSlot = timeSlots.find((slot) => slot.time === time);
    if (!selectedSlot) {
      setMessageIsError(true);
      setMessage("Please choose one of the available time slots.");
      return;
    }

    const saved = createBooking(
      {
        roomId,
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim().toLowerCase(),
        date,
        time,
        purpose: purpose.trim(),
      },
      selectedSlot.maxBookableSeats,
    );

    if (!saved) {
      setMessageIsError(true);
      setMessage("This time slot is full or you already booked it. Please choose another slot.");
      return;
    }

    setMessageIsError(false);
    setMessage(`Your booking for ${roomName} is confirmed.`);
    setStudentName("");
    setStudentEmail("");
    setDate("");
    setTime("");
    setPurpose("");
  }

  return (
    <section className="mt-8 border-t border-slate-100 pt-7" aria-labelledby="booking-heading">
      <h2 id="booking-heading" className="text-base font-semibold text-[#102b46]">Ready to study here?</h2>
      <p className="mt-1 text-sm text-slate-500">Choose a date and time to request this room.</p>

      {!isOpen ? (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setMessage("");
          }}
          className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#102b46] px-5 text-sm font-semibold text-white transition hover:bg-[#183d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:w-auto"
        >
          Book This Room
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Student&apos;s full name
              <input
                type="text"
                autoComplete="name"
                required
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#102b46] outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
                placeholder="e.g. Alex Johnson"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Student&apos;s email address
              <input
                type="email"
                autoComplete="email"
                required
                value={studentEmail}
                onChange={(event) => setStudentEmail(event.target.value)}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#102b46] outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
                placeholder="you@university.edu"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Booking date
              <input
                type="date"
                required
                min={getToday()}
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setTime("");
                  setMessage("");
                }}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#102b46] outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Available time slot
              <select
                required
                value={time}
                onChange={(event) => {
                  setTime(event.target.value);
                  setMessage("");
                }}
                disabled={!date || !isReady || availableSlots.length === 0}
                className="mt-1.5 h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-[#102b46] outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">
                  {!date ? "Choose a date first" : availableSlots.length ? "Choose a time" : "No times available"}
                </option>
                {availableSlots.map((slot) => (
                  <option key={slot.time} value={slot.time}>{slot.time}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-700">
            Purpose of booking
            <textarea
              required
              rows={3}
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#102b46] outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/15"
              placeholder="What will you use the room for?"
            />
          </label>

          {message && (
            <p role="status" className={`rounded-lg px-4 py-3 text-sm ${messageIsError ? "bg-rose-50 text-rose-800" : "bg-teal-50 text-teal-900"}`}>
              {message}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setMessage("");
              }}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isReady}
              className="inline-flex h-11 items-center justify-center rounded-lg bg-[#102b46] px-5 text-sm font-semibold text-white transition hover:bg-[#183d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-wait disabled:opacity-60"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
