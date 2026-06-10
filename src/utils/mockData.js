const STORAGE_KEY = 'hostel_management_state';

const initialRooms = [
  {
    id: 'R101',
    number: '101',
    capacity: 2,
    type: 'AC Deluxe',
    price: 350,
    beds: [
      { id: '101-A', code: 'Bed A', allocatedTo: 'S01', status: 'Occupied' },
      { id: '101-B', code: 'Bed B', allocatedTo: null, status: 'Available' }
    ]
  },
  {
    id: 'R102',
    number: '102',
    capacity: 3,
    type: 'Non-AC Standard',
    price: 200,
    beds: [
      { id: '102-A', code: 'Bed A', allocatedTo: 'S02', status: 'Occupied' },
      { id: '102-B', code: 'Bed B', allocatedTo: null, status: 'Available' },
      { id: '102-C', code: 'Bed C', allocatedTo: null, status: 'Available' }
    ]
  },
  {
    id: 'R103',
    number: '103',
    capacity: 2,
    type: 'AC Deluxe',
    price: 350,
    beds: [
      { id: '103-A', code: 'Bed A', allocatedTo: 'S03', status: 'Occupied' },
      { id: '103-B', code: 'Bed B', allocatedTo: null, status: 'Available' }
    ]
  }
];

const initialStudents = [
  { id: 'S01', name: 'Alexander Wright', email: 'alex@example.com', phone: '+1 555-0199', status: 'Active', allocatedRoom: 'R101', allocatedBed: '101-A' },
  { id: 'S02', name: 'Sophia Sterling', email: 'sophia@example.com', phone: '+1 555-0188', status: 'Active', allocatedRoom: 'R102', allocatedBed: '102-A' },
  { id: 'S03', name: 'Marcus Vance', email: 'marcus@example.com', phone: '+1 555-0177', status: 'Active', allocatedRoom: 'R103', allocatedBed: '103-A' },
  { id: 'S04', name: 'Elena Rostova', email: 'elena@example.com', phone: '+1 555-0166', status: 'Active', allocatedRoom: null, allocatedBed: null },
  { id: 'S05', name: 'Dorian Gray', email: 'dorian@example.com', phone: '+1 555-0155', status: 'Active', allocatedRoom: null, allocatedBed: null }
];

const initialFoodMenu = {
  morning: 'Fluffy Pancakes with Maple Syrup, Fresh Blueberries, Scrambled Eggs & Cappuccino',
  afternoon: 'Grilled Herb Chicken Breast, Wild Rice, Steamed Asparagus & Cream of Mushroom Soup',
  night: 'Teriyaki Glazed Salmon, Roasted Broccoli, Quinoa & Warm Jasmine Green Tea'
};

const initialFoodReviews = [
  { id: 'REV01', studentName: 'Alexander Wright', mealType: 'Morning', rating: 5, comment: 'Pancakes were absolutely delicious and fluffy!', timestamp: '2026-06-09T08:15:00Z' },
  { id: 'REV02', studentName: 'Sophia Sterling', mealType: 'Afternoon', rating: 4, comment: 'Chicken was well-cooked, but could use slightly more seasoning. Soup was amazing.', timestamp: '2026-06-09T13:30:00Z' },
  { id: 'REV03', studentName: 'Marcus Vance', mealType: 'Night', rating: 5, comment: 'Salmon was perfectly glazed and moist. Best dinner this week!', timestamp: '2026-06-09T20:45:00Z' }
];

const initialAttendance = [
  { id: 'ATT01', studentId: 'S01', studentName: 'Alexander Wright', date: '2026-06-09', session: 'Morning', type: 'Sign In', timestamp: '2026-06-09T08:05:00Z' },
  { id: 'ATT02', studentId: 'S02', studentName: 'Sophia Sterling', date: '2026-06-09', session: 'Morning', type: 'Sign In', timestamp: '2026-06-09T08:10:00Z' },
  { id: 'ATT03', studentId: 'S03', studentName: 'Marcus Vance', date: '2026-06-09', session: 'Morning', type: 'Sign In', timestamp: '2026-06-09T08:20:00Z' }
];

export const getInitialState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored hostel state, resetting...', e);
    }
  }
  
  const defaultState = {
    rooms: initialRooms,
    students: initialStudents,
    foodMenu: initialFoodMenu,
    foodReviews: initialFoodReviews,
    attendance: initialAttendance
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
  return defaultState;
};

export const saveState = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
