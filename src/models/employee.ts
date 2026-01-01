export interface Employee {
  _id?: any;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  position: string;
  image: string;
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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  position: string;
  image: string;
}

export interface EmployeeLoginData {
  email: string;
  password: string;
}