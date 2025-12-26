import {
    Chip,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";
import {
    EyeIcon,
    PencilIcon,
    TrashIcon,
    ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";
import { BookingDetails, Column } from "@zenra/models";
import { getStatusColor } from "./BookingFilters";
import { useState } from "react";

interface BookingColumnsProps {
    handleView: (booking: BookingDetails) => void;
    handleEdit: (booking: BookingDetails) => void;
    handleDelete: (bookingId: string) => void;
    handleStatusChange: (
        bookingId: string,
        status: "pending" | "confirmed" | "cancelled"
    ) => void;
}

/**
 * BookingActions Component
 * Handles actions + status menu for a single booking row
 */
const BookingActions = ({
    booking,
    handleView,
    handleEdit,
    handleDelete,
    handleStatusChange,
}: {
    booking: BookingDetails;
    handleView: (booking: BookingDetails) => void;
    handleEdit: (booking: BookingDetails) => void;
    handleDelete: (bookingId: string) => void;
    handleStatusChange: (
        bookingId: string,
        status: "pending" | "confirmed" | "cancelled"
    ) => void;
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleStatusSelect = (status: "pending" | "confirmed" | "cancelled") => {
        handleStatusChange(String(booking._id), status);
        handleMenuClose();
    };

    return (
        <div className="flex justify-end space-x-2">
            <IconButton
                style={{ color: '#306bec' }}
                onClick={() => handleView(booking)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
                <EyeIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
                style={{ color: '#16a34a' }}
                onClick={() => handleEdit(booking)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
                <PencilIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
                style={{ color: '#dc2626' }}
                onClick={() => handleDelete(String(booking._id ?? ""))}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <TrashIcon className="h-4 w-4" />
            </IconButton>

            {/* Change status dropdown */}
            <IconButton
                style={{ color: '#9639eb' }}
                onClick={handleMenuOpen}
                className="text-purple-600 hover:bg-purple-50"
            >
                <ArrowsUpDownIcon className="h-4 w-4" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {["pending", "confirmed", "cancelled"].map((status) => (
                    <MenuItem
                        style={{ fontSize: "14px" }}
                        key={status}
                        onClick={() =>
                            handleStatusSelect(status as "pending" | "confirmed" | "cancelled")
                        }
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

/**
 * Booking Columns Definition
 */
export const bookingColumns = ({
    handleView,
    handleEdit,
    handleDelete,
    handleStatusChange,
}: BookingColumnsProps): Column<BookingDetails>[] => {
    return [
        {
            id: "firstName",
            label: "Customer",
            render: (b) => (
                <div>
                    <div className="font-medium">{`${b.firstName || ""} ${b.lastName || ""
                        }`}</div>
                    <div className="text-sm text-gray-500">{b.email || ""}</div>
                </div>
            ),
        },
        { id: "packageTitle", label: "Package", sortable: true },
        { id: "travelDate", label: "Travel Date", sortable: true },
        {
            id: "totalPrice",
            label: "Amount",
            render: (b) => `$${b.totalPrice || 0}`,
            sortable: true,
            align: "right",
        },
        {
            id: "status",
            label: "Status",
            render: (b) => (
                <Chip
                    label={
                        (b.status || "").charAt(0).toUpperCase() +
                        (b.status || "").slice(1)
                    }
                    color={getStatusColor(b.status)}
                    size="small"
                    style={{
                        width: '80px'
                    }}
                />
            ),
            sortable: true,
        },
        {
            id: "guests",
            label: "Guests",
            render: (b) =>
                `${(b.adults || 0) + (b.children || 0)} (${b.adults || 0
                } adults, ${b.children || 0} children)`,
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            render: (booking) => (
                <BookingActions
                    booking={booking}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleStatusChange={handleStatusChange}
                />
            ),
        },
    ];
};
