
export interface FeedbackFormData {
    id?: number;
    name: string;
    email: string;
    phone: string;
    message: string;
    country: string;
    serviceRating: number;
}

export interface Feedback {
    _id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    country: string;
    serviceRating: number;
    createdAt?: Date;
    updatedAt?: Date;
}