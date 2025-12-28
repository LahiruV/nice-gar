import { RegisterForm } from '@zenra/components';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { RegisterCredentials } from '@zenra/models';
import { useRegister } from '@zenra/services';
import { toast } from 'sonner'

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { registerMutate } = useRegister();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    const payload: RegisterCredentials = {
      name,
      email,
      password,
      isAdmin: true
    };

    registerMutate(payload, {
      onSuccess: () => {
        setLoading(false);
        toast.success('Registration successful! Welcome aboard.');
        navigate('/')
      },
      onError: (error) => {
        setLoading(false);
        toast.error('Registration failed. Please try again.');
        setError('Registration failed. Please try again.');
        console.error('Registration error:', error);
      },
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  }


  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://media.gettyimages.com/id/2208698368/photo/an-employee-performs-quality-checks-on-garments-inside-a-garment-factory-in-katunayake-free.jpg?s=612x612&w=0&k=20&c=LyzKrH1i_lwIY5ORwmUNy0uEZa9IfgiUjZ2ok9ofNX8="
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-30" />
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
        >
          <h2 className="text-3xl font-bold mb-2">Entry X</h2>
          <p className="text-lg">
            Streamlining Workforce Management for a Smarter Tomorrow
          </p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
            <p className="mt-2 text-gray-600">
              Already have an account?{' '}
              <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign In
              </Link>
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <RegisterForm
              onSubmit={handleSubmit}
              name={name}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
              onChange={handleChange}
              error={error}
              loading={loading}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};