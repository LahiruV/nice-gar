import { StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { Column, Feedback } from "@zenra/models";

interface FeedbackColumnsProps {
    handleDelete: (id: string) => void;
}

/**
 * FeedbackActions Component
 * Handles action buttons for a single feedback row
 */
const FeedbackActions = ({
    feedback,
    handleDelete,
}: {
    feedback: Feedback;
    handleDelete: (feedbackId: string) => void;
}) => {
    return (
        <div className="flex justify-end space-x-2">
            <IconButton
                style={{ color: '#dc2626' }}
                onClick={() => handleDelete(feedback._id?.toString() || "")}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <TrashIcon className="h-4 w-4" />
            </IconButton>
        </div>
    );
};

/**
 * Feedback Columns Definition
 */
export const feedbackColumns = ({
    handleDelete,
}: FeedbackColumnsProps): Column<Feedback>[] => {
    return [
        {
            id: "name",
            label: "Name",
        },
        {
            id: "message",
            label: "Message",
        },
        {
            id: "country",
            label: "Country",
        },
        {
            id: "serviceRating",
            label: "Service Rating",
            render: (feedback) => (
                <div className="flex mb-4" aria-label={'Service Rating'}>
                    {[...Array(Math.round(feedback.serviceRating))].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    ))}
                </div>
            ),
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            render: (feedback) => (
                <FeedbackActions
                    feedback={feedback}
                    handleDelete={handleDelete}
                />
            ),
        },
    ];
};
