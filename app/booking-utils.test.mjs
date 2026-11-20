import assert from "node:assert/strict";
import test from "node:test";
import {
  getAvailableTimeSlots,
  getSlotBookingCount,
  hasStudentBookedSlot,
  isPastBookingDate,
} from "./booking-utils.ts";

const slot = { time: "9:00 AM - 10:00 AM", maxBookableSeats: 2 };

test("available slots exclude only full room, date, and time combinations", () => {
  const bookings = [
    { roomId: 1, date: "2026-11-20", time: slot.time, studentEmail: "one@school.edu" },
    { roomId: 1, date: "2026-11-20", time: slot.time, studentEmail: "two@school.edu" },
  ];

  assert.deepEqual(getAvailableTimeSlots([slot], bookings, 1, "2026-11-20"), []);
  assert.deepEqual(getAvailableTimeSlots([slot], bookings, 1, "2026-11-21"), [slot]);
  assert.deepEqual(getAvailableTimeSlots([slot], bookings, 2, "2026-11-20"), [slot]);
});

test("booking counts match the selected room, date, and time", () => {
  const bookings = [
    { roomId: 1, date: "2026-11-20", time: slot.time },
    { roomId: 1, date: "2026-11-21", time: slot.time },
    { roomId: 2, date: "2026-11-20", time: slot.time },
  ];

  assert.equal(getSlotBookingCount(bookings, 1, "2026-11-20", slot.time), 1);
});

test("the same student cannot submit the same room, date, and time twice", () => {
  const existingBooking = {
    roomId: 1,
    date: "2026-11-20",
    time: slot.time,
    studentEmail: "student@school.edu",
  };

  assert.equal(
    hasStudentBookedSlot([existingBooking], {
      ...existingBooking,
      studentEmail: "STUDENT@school.edu",
    }),
    true,
  );
  assert.equal(
    hasStudentBookedSlot([existingBooking], {
      ...existingBooking,
      studentEmail: "another@school.edu",
    }),
    false,
  );
});

test("past dates are rejected while today and future dates remain valid", () => {
  assert.equal(isPastBookingDate("2026-11-19", "2026-11-20"), true);
  assert.equal(isPastBookingDate("2026-11-20", "2026-11-20"), false);
  assert.equal(isPastBookingDate("2026-11-21", "2026-11-20"), false);
});
