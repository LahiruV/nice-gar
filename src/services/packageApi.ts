import { useMutation, useQuery } from '@tanstack/react-query';
import { EmployeeFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';

export const usePackage = () => {
    const { mutate: packageAddMutate, ...addMutate } = useMutation({
        mutationFn: async (payload: EmployeeFormData) => {
            const response = await axios.post<EmployeeFormData>(
                `${import.meta.env.VITE_API_URL}/packages/add`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: EmployeeFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package-add'],
    });

    const { mutate: packageUpdateMutate, ...updateMutate } = useMutation({
        mutationFn: async (payload: EmployeeFormData) => {
            const response = await axios.put<EmployeeFormData>(
                `${import.meta.env.VITE_API_URL}/packages/update`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: EmployeeFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package-update'],
    });

    const { mutate: packageDeleteMutate, ...deleteMutate } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/packages/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: EmployeeFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package-delete'],
    });

    return {
        packageAddMutate,
        ...addMutate,
        packageUpdateMutate,
        ...updateMutate,
        packageDeleteMutate,
        ...deleteMutate,
    };
};

export const getPackages = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<EmployeeFormData>(`${import.meta.env.VITE_API_URL}/packages`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-packages'],
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

export const getAllPackages = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<EmployeeFormData>(`${import.meta.env.VITE_API_URL}/packages/all`);
        return data;
    };
    const { data: response, status, error, refetch } = useQuery({
        queryKey: ['get-all-packages'],
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