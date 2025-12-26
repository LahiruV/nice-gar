import { useMutation, useQuery } from '@tanstack/react-query';
import { Feedback, FeedbackFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';


export const useFeedback = () => {
    const { mutate: feedBackMutate, ...addMutate } = useMutation({
        mutationFn: async (payload: FeedbackFormData) => {
            const response = await axios.post<FeedbackFormData>(`${import.meta.env.VITE_API_URL}/feedback/add`, payload);
            return response.data;
        },
        onSuccess: (response: FeedbackFormData) => response,
        onError: (err: AxiosError) => err,
    });

    const { mutate: feedbackDeleteMutate, ...deleteMutate } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/feedback/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: FeedbackFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['delete-feedback'],
    });
    return {
        feedBackMutate,
        ...addMutate,
        feedbackDeleteMutate,
        ...deleteMutate
    };
};

export const getFeedbacks = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<Feedback[]>(`${import.meta.env.VITE_API_URL}/feedback`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-feedbacks'],
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