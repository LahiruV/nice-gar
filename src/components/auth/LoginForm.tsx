import { TextField, Button, PowerdBy } from '@zenra/widgets';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <TextField
        label="Email address"
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        startIcon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
      />

      <TextField
        label="Password"
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        startIcon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
      />

      <Button type="submit" fullWidth size="large" variant="primary">
        Sign in
      </Button>
      <PowerdBy isFull={false} />
    </form>
  );
};