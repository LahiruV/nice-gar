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
        },
        {
            id: "endDate",
            label: "End Date",
            align: "right",
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
            render: (pkg) => (`${pkg.status1}, ${pkg.status2}, ${pkg.status3}`),
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
