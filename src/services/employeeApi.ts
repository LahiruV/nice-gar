import { useMutation, useQuery } from '@tanstack/react-query';
import { EmployeeFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';

export const useEmployee = () => {
    const { mutate: employeeAddMutate, ...addMutate } = useMutation({
        mutationFn: async (payload: EmployeeFormData) => {
            const response = await axios.post<EmployeeFormData>(
                `${import.meta.env.VITE_API_URL}/employees/add`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: EmployeeFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['employee-add'],
    });

    const { mutate: employeeUpdateMutate, ...updateMutate } = useMutation({
        mutationFn: async (payload: EmployeeFormData) => {
            const response = await axios.put<EmployeeFormData>(
                `${import.meta.env.VITE_API_URL}/employees/update`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: EmployeeFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['employee-update'],
    });

    const { mutate: employeeDeleteMutate, ...deleteMutate } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/employees/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: EmployeeFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['employee-delete'],
    });

    return {
        employeeAddMutate,
        ...addMutate,
        employeeUpdateMutate,
        ...updateMutate,
        employeeDeleteMutate,
        ...deleteMutate,
    };
};

export const getEmployees = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<EmployeeFormData>(`${import.meta.env.VITE_API_URL}/employees`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-employees'],
        queryFn: () => fetch(),
        enabled: isExecute,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    return {
        response,
        status,
        error,
        refetch,
        isFetching
    };
};

export const getAllEmployees = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<EmployeeFormData>(`${import.meta.env.VITE_API_URL}/employees/all`);
        return data;
    };
    const { data: response, status, error, refetch } = useQuery({
        queryKey: ['get-all-employees'],
        queryFn: () => fetch(),
        enabled: isExecute,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
    });
    return {
        response,
        status,
        error,
        refetch
    };
};