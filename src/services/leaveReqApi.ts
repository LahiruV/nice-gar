import { useMutation, useQuery } from '@tanstack/react-query';
import { EmployeeLeaveRequest, EmployeeLeaveRequestFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';

export const useLeaveRequest = () => {
    const { mutate: leaveReqAddMutate, ...addMutate } = useMutation({
        mutationFn: async (payload: EmployeeLeaveRequestFormData) => {
            const response = await axios.post<EmployeeLeaveRequestFormData>(
                `${import.meta.env.VITE_API_URL}/leave-requests/add`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: EmployeeLeaveRequestFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['leave-requests-add'],
    });

    const { mutate: leaveReqUpdateMutate, ...updateMutate } = useMutation({
        mutationFn: async (payload: EmployeeLeaveRequestFormData) => {
            const response = await axios.put<EmployeeLeaveRequestFormData>(
                `${import.meta.env.VITE_API_URL}/leave-requests/update`,
                payload
            );
            return response.data;
        },
        onSuccess: (response: EmployeeLeaveRequestFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['leave-requests-update'],
    });

    const { mutate: leaveReqDeleteMutate, ...deleteMutate } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/leave-requests/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: EmployeeLeaveRequestFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['leave-requests-delete'],
    });

    return {
        leaveReqAddMutate,
        ...addMutate,
        leaveReqUpdateMutate,
        ...updateMutate,
        leaveReqDeleteMutate,
        ...deleteMutate,
    };
};

export const getLeaveRequests = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<EmployeeLeaveRequest>(`${import.meta.env.VITE_API_URL}/leave-requests`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-leave-requests'],
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