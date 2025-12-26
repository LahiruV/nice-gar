import { useMutation, useQuery } from '@tanstack/react-query';
import { BookingDashboard, BookingExcelDataColumns, BookingFormData } from '@zenra/models';
import axios, { AxiosError } from 'axios';
import { exportToExcel } from './ExcelExportService';


export const useBooking = () => {
    const { mutate: bookingMutate, ...addMutate } = useMutation({
        mutationFn: async (payload: BookingFormData) => {
            const response = await axios.post<BookingFormData>(`${import.meta.env.VITE_API_URL}/booking/add`, payload);
            return response.data;
        },
        onSuccess: (response: BookingFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['add-booking']
    });
    const { mutate: bookingUpdateMutate, ...updateMutate } = useMutation({
        mutationFn: async (payload: BookingFormData) => {
            const response = await axios.put<BookingFormData>(`${import.meta.env.VITE_API_URL}/booking/update`, payload);
            return response.data;
        },
        onSuccess: (response: BookingFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['update-booking']
    });
    const { mutate: bookingStatusUpdateMutate, ...updateStatusMutate } = useMutation({
        mutationFn: async (payload: { id: string; status: "pending" | "confirmed" | "cancelled" }) => {
            const response = await axios.patch<BookingFormData>(`${import.meta.env.VITE_API_URL}/booking/status/${payload.id}`, { status: payload.status });
            return response.data;
        },
        onSuccess: (response: BookingFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['status-booking']
    });
    const { mutate: bookingDeleteMutate, ...deleteMutate } = useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/booking/delete/${id}`);
            return response.data;
        },
        onSuccess: (response: BookingFormData) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['delete-booking'],
    });
    return {
        bookingMutate,
        ...addMutate,
        bookingUpdateMutate,
        ...updateMutate,
        bookingStatusUpdateMutate,
        ...updateStatusMutate,
        bookingDeleteMutate,
        ...deleteMutate,
    };
};

export const getBookings = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<any[]>(`${import.meta.env.VITE_API_URL}/booking`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-bookings'],
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

export const getBookingDashboard = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<BookingDashboard>(`${import.meta.env.VITE_API_URL}/booking/dashboard`);
        return data;
    };
    const { data: response, status, error, refetch } = useQuery({
        queryKey: ['get-booking-dashboard'],
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
    };
};

export const getBookingRecent = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<any>(`${import.meta.env.VITE_API_URL}/booking/recent`);
        return data;
    };
    const { data: response, status, error, refetch, isFetching } = useQuery({
        queryKey: ['get-booking-recent'],
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

export const getBookingsExcel = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await axios.get<any[]>(`${import.meta.env.VITE_API_URL}/booking`);
        try {
            await exportToExcel(data.data, BookingExcelDataColumns, 'Bookings Report', '7FFFD4');
        } catch (error) {
            console.error("Error exporting data:", error);
        }
        return data;
    };
    const { data: response, status, error, refetch, } = useQuery({
        queryKey: ['get-bookings-excel'],
        queryFn: () => fetch(),
        enabled: isExecute,
        refetchOnMount: 'always',
        refetchOnWindowFocus: true,
        staleTime: 1000,
    });
    return {
        response,
        status,
        error,
        refetch
    };
};