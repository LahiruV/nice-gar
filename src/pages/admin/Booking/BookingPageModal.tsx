import { PencilIcon } from "@heroicons/react/24/outline";
import { BookingDetails } from "@zenra/models";
import { Button, Modal } from "@zenra/widgets";

interface BookingPageModalProps {
    isOpen: boolean;
    setIsClose: Function;
    bookingDetails: BookingDetails | null;
    setIsEditOpen: Function;
}

export const BookingPageModal = ({
    isOpen,
    setIsClose,
    bookingDetails,
    setIsEditOpen,
}: BookingPageModalProps) => {
    return (
        <Modal
            open={isOpen}
            onClose={() => setIsClose(false)}
            title="Booking Details"
        >
            {bookingDetails && (
                <div className="space-y-6">
                    {/* Package Image */}
                    {/* {bookingDetails.packageImage && (
                        <img
                            src={`data:image/jpeg;base64,${bookingDetails.packageImage}`}
                            alt={bookingDetails.packageTitle}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    )} */}

                    {/* Package Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {bookingDetails.packageTitle}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {bookingDetails.packageDescription}
                        </p>
                    </div>

                    {/* All Booking Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="font-semibold text-gray-700">Booking ID:</span>
                            <p className="text-gray-900">{bookingDetails._id}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Package ID:</span>
                            <p className="text-gray-900">{bookingDetails.packageId}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">First Name:</span>
                            <p className="text-gray-900">{bookingDetails.firstName}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Last Name:</span>
                            <p className="text-gray-900">{bookingDetails.lastName}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Email:</span>
                            <p className="text-gray-900">{bookingDetails.email}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Phone:</span>
                            <p className="text-gray-900">{bookingDetails.phone}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Travel Date:</span>
                            <p className="text-gray-900">{bookingDetails.travelDate}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Adults:</span>
                            <p className="text-gray-900">{bookingDetails.adults}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Children:</span>
                            <p className="text-gray-900">{bookingDetails.children}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Meal Plan:</span>
                            <p className="text-gray-900">{bookingDetails.mealPlan}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Transport Included:</span>
                            <p className="text-gray-900">
                                {bookingDetails.includeTransport ? "Yes" : "No"}
                            </p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Accommodation Included:</span>
                            <p className="text-gray-900">
                                {bookingDetails.includeAccommodation ? "Yes" : "No"}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold text-gray-700">Special Requests:</span>
                            <p className="text-gray-900">
                                {bookingDetails.specialRequests || "None"}
                            </p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Status:</span>
                            <p className="text-gray-900 capitalize">{bookingDetails.status}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">Package Price:</span>
                            <p className="text-gray-900">{bookingDetails.packagePrice}</p>
                        </div>
                        {bookingDetails.increasePrice !== 0 &&
                            <div>
                                <span className="font-semibold text-gray-700">Increased Price:</span>
                                <p className="text-gray-900 capitalize">{bookingDetails.increasePrice}</p>
                            </div>
                        }
                        {bookingDetails.discount !== 0 &&
                            <div>
                                <span className="font-semibold text-gray-700">Discount Price:</span>
                                <p className="text-gray-900">{bookingDetails.discount}</p>
                            </div>
                        }
                        <div>
                            <span className="font-semibold text-gray-700">Total Price:</span>
                            <p className="text-2xl font-bold text-primary">
                                ${bookingDetails.totalPrice}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4 pt-6">
                        <Button variant="outline" onClick={() => setIsClose(false)}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setIsClose(false);
                                setIsEditOpen(true);
                            }}
                            startIcon={<PencilIcon className="h-5 w-5" />}
                        >
                            Edit Booking
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
