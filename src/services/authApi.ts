import { useMutation } from '@tanstack/react-query';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '@zenra/models';
import axios, { AxiosError } from 'axios';


export const useLogin = () => {
  const { mutate: loginMutate } = useMutation({
    mutationFn: async (payload: LoginCredentials) => {
      const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_API_URL}/auth/login`, payload);
      return response.data;
    },
    onSuccess: (response: AuthResponse) => response,
    onError: (err: AxiosError) => err,
    mutationKey: ['login'],
  });
  return {
    loginMutate,
  };
};


export const useRegister = () => {
  const { mutate: registerMutate } = useMutation({
    mutationFn: async (payload: RegisterCredentials) => {
      const response = await axios.post<AuthResponse>(`${import.meta.env.VITE_API_URL}/auth/signup`, payload);
      return response.data;
    },
    onSuccess: (response: AuthResponse) => response,
    onError: (err: AxiosError) => err,
    mutationKey: ['register'],
  });
  return {
    registerMutate,
  };
}