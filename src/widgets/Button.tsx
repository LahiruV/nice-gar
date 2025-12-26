import { Button as MuiButton } from '@mui/material';
import { ButtonProps } from '@zenra/models';

export const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <MuiButton
      {...props}
      sx={{
        backgroundColor: variant === 'primary' ? '#0096C7' : variant === 'secondary' ? '#FF6B6B' : 'transparent',
        color: variant === 'outline' || variant === 'text' ? '#0096C7' : '#FFFFFF',
        borderColor: variant === 'outline' ? '#0096C7' : 'transparent',
        '&:hover': {
          backgroundColor: variant === 'primary' ? '#0077A0' : variant === 'secondary' ? '#FF5252' : 'rgba(0, 150, 199, 0.1)',
        }
      }}
      variant={variant === 'outline' ? 'outlined' : variant === 'text' ? 'text' : 'contained'}
      size={size}
      fullWidth={fullWidth}
      disabled={loading}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {children}
    </MuiButton>
  );
};