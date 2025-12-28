export interface Package {
  _id?: any;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  startDate: string;
  hotels?: Hotel[];
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  amenities: string[];
}

export interface PackageFilters {
  duration: string;
  setDuration: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
}

export interface EmployeeFormData {
  id?: any;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  groupSize: string;
  startDate: string;
}