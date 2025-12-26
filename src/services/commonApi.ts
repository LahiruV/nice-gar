import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';


export const useImageToBase64 = () => {
    const { mutate: imageToBase64Mutate } = useMutation({
        mutationFn: async (imageFile: File) => {
            const formData = new FormData();
            formData.append('imageFile', imageFile);

            const response = await axios.post<string>(
                `${import.meta.env.VITE_API_URL}/common/convert-image`,
                formData
            );
            return response.data;
        },
        onSuccess: (response: string) => response,
        onError: (err: AxiosError) => err,
        mutationKey: ['image to base64'],
    });
    return {
        imageToBase64Mutate,
    };
};