export interface Excel {
    header: string;
    key: string;
    width: number;
}

export const BookingExcelDataColumns: Excel[] = [
    { header: 'ID', key: '_id', width: 10 },
    { header: 'Package ID', key: 'packageId', width: 12 },
    { header: 'First Name', key: 'firstName', width: 15 },
    { header: 'Last Name', key: 'lastName', width: 15 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Phone', key: 'phone', width: 15 },
    { header: 'Travel Date', key: 'travelDate', width: 15 },
    { header: 'Meal Plan', key: 'mealPlan', width: 12 },
    { header: 'Include Transport', key: 'includeTransport', width: 18 },
    { header: 'Include Accommodation', key: 'includeAccommodation', width: 20 },
    { header: 'Special Requests', key: 'specialRequests', width: 20 },
    { header: 'Status', key: 'status', width: 12 },
    { header: 'Package Title', key: 'packageTitle', width: 20 },
    { header: 'Package Price', key: 'packagePrice', width: 12 },
    { header: 'Adults', key: 'adults', width: 8 },
    { header: 'Children', key: 'children', width: 8 },
    { header: 'Total Price', key: 'totalPrice', width: 15 }
]