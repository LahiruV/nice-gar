import { useMutation, useQuery } from '@tanstack/react-query';
import { PackageOutRequest, PackageOutRequestFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';

export const usePackageOutRequest = () => {
    const { mutate: packageOutAddMutate, ...addMutate } = useMutation({
        mutationFn: async (payload: PackageOutRequestFormData) => {
            const response = await axios.post<PackageOutRequestFormData>(
                `${import.meta.env.VITE_API_URL}/package-out-requests/add`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: PackageOutRequestFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package-out-requests-add'],
    });

    const { mutate: packageOutUpdateMutate, ...updateMutate } = useMutation({
        mutationFn: async (payload: PackageOutRequestFormData) => {
            const response = await axios.put<PackageOutRequestFormData>(
                `${import.meta.env.VITE_API_URL}/package-out-requests/update`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: PackageOutRequestFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package-out-requests-update'],
    });

    const { mutate: packageOutDeleteMutate, ...deleteMutate } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/package-out-requests/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: PackageOutRequestFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['package-out-requests-delete'],
    });

    return {
        packageOutAddMutate,
        ...addMutate,
        packageOutUpdateMutate,
        ...updateMutate,
        packageOutDeleteMutate,
        ...deleteMutate,
    };
};

export const getPackageOutRequests = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<PackageOutRequest>(`${import.meta.env.VITE_API_URL}/package-out-requests`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-package-out-requests'],
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

export const getPackageOutRequestsByEmployee = (isExecute: boolean, employeeId: string) => {
    const fetch = async () => {
        const data = await axios.get<PackageOutRequest>(`${import.meta.env.VITE_API_URL}/package-out-requests/employee/${employeeId}`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-package-out-requests-employee', employeeId],
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