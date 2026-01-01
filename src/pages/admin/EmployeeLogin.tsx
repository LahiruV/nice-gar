import { LoginForm } from '@zenra/components';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner'
import { EmployeeLoginData } from '@zenra/models';
import { useEmployee, } from '@zenra/services';
import { FingerPrintIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { setAuthenticated, setUser } from '@zenra/store';

export const EmployeeLoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { employeeLoginMutate } = useEmployee();

    const handleLogin = async (email: string, password: string) => {
        const payload: EmployeeLoginData = {
            email,
            password
        };

        employeeLoginMutate(payload, {
            onSuccess: (response) => {
                dispatch(setUser(response.user));
                dispatch(setAuthenticated(true));
                toast.success('Login successful! Welcome back.');
                navigate('/admin/employees');
            },
            onError: (error) => {
                toast.error('Login failed. Please check your credentials and try again.');
                console.error('Login error:', error);
            },
        });
    };

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
                        <Link
                            to="/"
                            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
                        >
                            <span>Back to Admin Login</span>
                            <FingerPrintIcon className="h-5 w-5 ml-2" />
                        </Link>
                        <h2 className="text-3xl font-bold text-gray-900">Login to Your Account</h2>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <LoginForm onSubmit={handleLogin} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};