import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { Column, EmployeeLeaveRequest } from "@zenra/models";

interface LeaveReqColumnsProps {
    handleView: (pkg: EmployeeLeaveRequest) => void;
    handleEdit: (pkg: EmployeeLeaveRequest) => void;
    handleDelete: (pkgId: string) => void;
}

/**
 * EmployeeActions Component
 * Handles action buttons for a single employee row
 */
const Actions = ({
    pkg,
    handleView,
    handleEdit,
    handleDelete,
}: {
    pkg: EmployeeLeaveRequest;
    handleView: (pkg: EmployeeLeaveRequest) => void;
    handleEdit: (pkg: EmployeeLeaveRequest) => void;
    handleDelete: (pkgId: string) => void;
}) => {
    return (
        <div className="flex justify-end space-x-2">
            <IconButton
                style={{ color: '#306bec' }}
                onClick={() => handleView(pkg)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
                <EyeIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
                style={{ color: '#16a34a' }}
                onClick={() => handleEdit(pkg)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
                <PencilIcon className="h-4 w-4" />
            </IconButton>
            <IconButton
                style={{ color: '#dc2626' }}
                onClick={() => handleDelete(pkg._id ?? "")}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <TrashIcon className="h-4 w-4" />
            </IconButton>
        </div>
    );
};

/**
 * Employee Columns Definition
 */
export const leaveReqColumns = ({
    handleView,
    handleEdit,
    handleDelete,
}: LeaveReqColumnsProps): Column<EmployeeLeaveRequest>[] => {
    return [
        {
            id: "employeeName",
            label: "Employee Name",
            align: "right",
        },
        {
            id: "startDate",
            label: "Start Date",
            align: "right",
            render: (pkg) => new Date(pkg.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
        },
        {
            id: "endDate",
            label: "End Date",
            align: "right",
            render: (pkg) => new Date(pkg.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
        },
        {
            id: "reason",
            label: "Reason",
            align: "right",
        },
        {
            id: "status",
            label: "Status",
            align: "right",
            render: (pkg) => {
                const statuses = [pkg.status1, pkg.status2, pkg.status3, pkg.status4];
                let statusText = "Unknown";
                let chipClass = "bg-gray-100 text-gray-800";

                if (statuses.some(status => status === 3)) {
                    statusText = "Rejected";
                    chipClass = "bg-red-100 text-red-800";
                } else if (statuses.every(status => status === 2)) {
                    statusText = "Accepted";
                    chipClass = "bg-green-100 text-green-800";
                } else if (statuses.some(status => status === 1)) {
                    statusText = "Pending";
                    chipClass = "bg-yellow-100 text-yellow-800";
                }

                return (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${chipClass}`}>
                        {statusText}
                    </span>
                );
            },
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            render: (pkg) => (
                <Actions
                    pkg={pkg}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ),
        },
    ];
};
