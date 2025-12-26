export interface BookingFormData {
  id?: string;
  packageId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelDate: string;
  adults: number;
  children: number;
  mealPlan: 'bb' | 'hb' | 'fb';
  includeTransport: boolean;
  includeAccommodation: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  specialRequests?: string;
  increasePrice?: number;
  discount?: number;
}

export interface BookingFormProps {
  packageId: string;
  packageName: string;
  onSubmit: (data: BookingFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface Filters {
  status: string;
  startDate: string;
  endDate: string;
  packageName: string;
  search: string;
}

export interface Booking {
  id: string;
  customerName: string;
  packageName: string;
  bookingDate: string;
  travelDate: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  adults: number;
  children: number;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BookingDetails {
  _id: string;
  packageId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelDate: string; // ISO date string (YYYY-MM-DD)
  adults: number;
  children: number;
  mealPlan: string;
  includeTransport: number; // 0 or 1
  includeAccommodation: number; // 0 or 1
  specialRequests: string;
  status: string;
  packageTitle: string;
  packageDescription: string;
  packagePrice: string; // could be number if desired
  packageImage: string; // base64, use `data:image/jpeg;base64,` prefix when rendering
  totalPrice: number;
  increasePrice?: number;
  discount?: number;
}

export interface BookingDashboard {
  count: number;
  pendingCount: number;
  totalRevenue: number;
};