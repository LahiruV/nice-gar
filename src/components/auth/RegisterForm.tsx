import { TextField, Button } from '@zenra/widgets';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

interface RegisterFormProps {
  onSubmit: Function;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  loading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, name, email, password, confirmPassword, onChange }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <TextField
        label="Full name"
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={onChange}
        required
        startIcon={<UserIcon className="h-5 w-5 text-gray-400" />}
      />

      <TextField
        label="Email address"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={onChange}
        required
        startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
      />

      <TextField
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={onChange}
        required
        startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
      />

      <TextField
        label="Confirm password"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={onChange}
        required
        startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
      />

      <Button type="submit" fullWidth size="large" variant="primary">
        Create account
      </Button>
    </form>
  );
};