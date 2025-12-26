import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DropdownOption } from '@zenra/models';

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Dropdown = ({ label, options, value, onChange }: DropdownProps) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          backgroundColor: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};