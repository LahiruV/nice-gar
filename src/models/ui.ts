export interface DropdownOption {
  value: string;
  label: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

export interface Column<T> {
  id: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  pagination?: boolean;
  defaultSort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  hover?: boolean;
  className?: string;
}