export type BookingSlot = {
  roomId: number;
  date: string;
  time: string;
};

export type BookableTimeSlot = {
  time: string;
  maxBookableSeats: number;
};

type BookingWithStudent = BookingSlot & {
  studentEmail: string;
};

export function getSlotBookingCount<T extends BookingSlot>(
  bookings: T[],
  roomId: number,
  date: string,
  time: string,
) {
  return bookings.filter(
    (booking) =>
      booking.roomId === roomId && booking.date === date && booking.time === time,
  ).length;
}

export function hasStudentBookedSlot(
  bookings: BookingWithStudent[],
  newBooking: BookingWithStudent,
) {
  return bookings.some(
    (booking) =>
      booking.roomId === newBooking.roomId &&
      booking.date === newBooking.date &&
      booking.time === newBooking.time &&
      booking.studentEmail.toLowerCase() === newBooking.studentEmail.toLowerCase(),
  );
}

export function getAvailableTimeSlots<T extends BookingSlot>(
  timeSlots: BookableTimeSlot[],
  bookings: T[],
  roomId: number,
  date: string,
) {
  return timeSlots.filter(
    (slot) =>
      getSlotBookingCount(bookings, roomId, date, slot.time) < slot.maxBookableSeats,
  );
}

export function isPastBookingDate(date: string, today: string) {
  // Both values use YYYY-MM-DD, so string order matches calendar order.
  return date < today;
}
