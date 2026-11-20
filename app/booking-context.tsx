"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getSlotBookingCount, hasStudentBookedSlot } from "./booking-utils";

export type Booking = {
  id: string;
  roomId: number;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  purpose: string;
};

type NewBooking = Omit<Booking, "id">;

type BookingContextValue = {
  bookings: Booking[];
  isReady: boolean;
  createBooking: (newBooking: NewBooking, maxSeats: number) => boolean;
  cancelBooking: (bookingId: string) => void;
};

const STORAGE_KEY = "campus-space-bookings";
const EMPTY_BOOKINGS: Booking[] = [];
const BookingContext = createContext<BookingContextValue | undefined>(undefined);
const listeners = new Set<() => void>();
let cachedBookings: Booking[] | null = null;

// Read local storage once and keep the same array until bookings change.
function getBookingsSnapshot() {
  if (cachedBookings) {
    return cachedBookings;
  }

  try {
    const savedBookings = window.localStorage.getItem(STORAGE_KEY);
    cachedBookings = savedBookings ? (JSON.parse(savedBookings) as Booking[]) : EMPTY_BOOKINGS;
  } catch {
    cachedBookings = EMPTY_BOOKINGS;
  }

  return cachedBookings;
}

function getServerBookingsSnapshot() {
  return EMPTY_BOOKINGS;
}

function subscribeToBookings(listener: () => void) {
  listeners.add(listener);

  function handleStorageChange(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      cachedBookings = null;
      listener();
    }
  }

  window.addEventListener("storage", handleStorageChange);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

function getReadySnapshot() {
  return true;
}

function getServerReadySnapshot() {
  return false;
}

function subscribeToReady() {
  return () => {};
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const bookings = useSyncExternalStore(
    subscribeToBookings,
    getBookingsSnapshot,
    getServerBookingsSnapshot,
  );
  const isReady = useSyncExternalStore(
    subscribeToReady,
    getReadySnapshot,
    getServerReadySnapshot,
  );

  const createBooking = useCallback(
    (newBooking: NewBooking, maxSeats: number) => {
      const savedBookings = getBookingsSnapshot();
      // One booking uses one bookable seat. Reject repeat bookings and full slots.
      const alreadyBooked = hasStudentBookedSlot(savedBookings, newBooking);
      const slotIsFull =
        getSlotBookingCount(
          savedBookings,
          newBooking.roomId,
          newBooking.date,
          newBooking.time,
        ) >= maxSeats;

      if (alreadyBooked || slotIsFull) {
        return false;
      }

      const updatedBookings = [
        ...savedBookings,
        { ...newBooking, id: `${Date.now()}-${Math.random()}` },
      ];
      cachedBookings = updatedBookings;

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
      } catch {
        // Keep this session working if the browser blocks local storage.
      }

      listeners.forEach((listener) => listener());
      return true;
    },
    [],
  );

  const cancelBooking = useCallback((bookingId: string) => {
    const updatedBookings = getBookingsSnapshot().filter(
      (booking) => booking.id !== bookingId,
    );
    cachedBookings = updatedBookings;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    } catch {
      // Keep the updated list available for this session if storage is blocked.
    }

    listeners.forEach((listener) => listener());
  }, []);

  return (
    <BookingContext.Provider
      value={{ bookings, isReady, createBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used inside a BookingProvider.");
  }
  return context;
}
