import { TextField as MuiTextField, InputAdornment, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'size'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const TextField = ({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  multiline,
  rows,
  InputProps,
  ...props
}: TextFieldProps) => {
  return (
    <MuiTextField
      label={label}
      error={!!error}
      helperText={error || helperText}
      fullWidth
      multiline={multiline}
      rows={rows}
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        endAdornment: endIcon && (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ),
        ...InputProps, // merge any extra InputProps safely
      }}
      {...props}
    />
  );
};
