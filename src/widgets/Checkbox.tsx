import { Checkbox as MuiCheckbox, FormControlLabel, FormGroup } from '@mui/material';

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

export const Checkbox = ({ checked, onChange, name, label }: CheckboxProps) => {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          checked={checked}
          onChange={onChange}
          name={name}
        />
      }
      label={label}
    />
  );
};

export { FormGroup };