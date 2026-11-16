// Sample rooms and bookable time slots for the campus room booking app.
// Each time slot can be booked by up to four people.
export const rooms = [
  {
    id: 1,
    name: "Main Library Study Room 204",
    building: "Main Library",
    capacity: 6,
    amenities: ["Whiteboard", "Power outlets", "Wi-Fi"],
    image:
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "9:00 AM - 10:00 AM", maxBookableSeats: 4 },
      { time: "11:00 AM - 12:00 PM", maxBookableSeats: 4 },
      { time: "2:00 PM - 3:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 2,
    name: "Engineering Design Lab",
    building: "Faculty of Engineering",
    capacity: 8,
    amenities: ["Projector", "Whiteboard", "Large worktables"],
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "10:00 AM - 11:00 AM", maxBookableSeats: 4 },
      { time: "1:00 PM - 2:00 PM", maxBookableSeats: 4 },
      { time: "3:00 PM - 4:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 3,
    name: "Science Seminar Room 1A",
    building: "Science Complex",
    capacity: 12,
    amenities: ["Projector", "Video conferencing", "Wi-Fi"],
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "8:00 AM - 9:00 AM", maxBookableSeats: 4 },
      { time: "12:00 PM - 1:00 PM", maxBookableSeats: 4 },
      { time: "4:00 PM - 5:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 4,
    name: "Student Union Collaboration Room",
    building: "Student Union",
    capacity: 10,
    amenities: ["Lounge seating", "Whiteboard", "Wi-Fi"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "9:00 AM - 10:00 AM", maxBookableSeats: 4 },
      { time: "12:00 PM - 1:00 PM", maxBookableSeats: 4 },
      { time: "5:00 PM - 6:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 5,
    name: "Business School Case Room 305",
    building: "School of Business",
    capacity: 14,
    amenities: ["Display screen", "Conference table", "Whiteboard"],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "10:00 AM - 11:00 AM", maxBookableSeats: 4 },
      { time: "2:00 PM - 3:00 PM", maxBookableSeats: 4 },
      { time: "4:00 PM - 5:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 6,
    name: "Arts Building Music Practice Room",
    building: "Fine Arts Building",
    capacity: 4,
    amenities: ["Piano", "Soundproofing", "Music stands"],
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "8:00 AM - 9:00 AM", maxBookableSeats: 4 },
      { time: "11:00 AM - 12:00 PM", maxBookableSeats: 4 },
      { time: "3:00 PM - 4:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 7,
    name: "Graduate Research Meeting Room",
    building: "Graduate Studies Center",
    capacity: 8,
    amenities: ["Video conferencing", "Display screen", "Whiteboard"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "9:00 AM - 10:00 AM", maxBookableSeats: 4 },
      { time: "1:00 PM - 2:00 PM", maxBookableSeats: 4 },
      { time: "3:00 PM - 4:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 8,
    name: "Law Moot Court Preparation Room",
    building: "School of Law",
    capacity: 6,
    amenities: ["Conference table", "Display screen", "Wi-Fi"],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "10:00 AM - 11:00 AM", maxBookableSeats: 4 },
      { time: "12:00 PM - 1:00 PM", maxBookableSeats: 4 },
      { time: "4:00 PM - 5:00 PM", maxBookableSeats: 4 },
    ],
  },
  {
    id: 9,
    name: "Health Sciences Simulation Debrief Room",
    building: "Health Sciences Center",
    capacity: 10,
    amenities: ["Projector", "Whiteboard", "Video conferencing"],
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    availableTimeSlots: [
      { time: "8:00 AM - 9:00 AM", maxBookableSeats: 4 },
      { time: "11:00 AM - 12:00 PM", maxBookableSeats: 4 },
      { time: "2:00 PM - 3:00 PM", maxBookableSeats: 4 },
    ],
  },
];
