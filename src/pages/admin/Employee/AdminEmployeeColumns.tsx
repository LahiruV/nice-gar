import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { Column, Employee } from "@zenra/models";

interface EmployeeColumnsProps {
    handleView: (pkg: Employee) => void;
    handleEdit: (pkg: Employee) => void;
    handleDelete: (pkgId: string) => void;
}

/**
 * EmployeeActions Component
 * Handles action buttons for a single employee row
 */
const EmployeeActions = ({
    pkg,
    handleView,
    handleEdit,
    handleDelete,
}: {
    pkg: Employee;
    handleView: (pkg: Employee) => void;
    handleEdit: (pkg: Employee) => void;
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
export const employeeColumns = ({
    handleView,
    handleEdit,
    handleDelete,
}: EmployeeColumnsProps): Column<Employee>[] => {
    return [
        {
            id: "image",
            label: "Image",
            render: (pkg) => (
                <img
                    src={
                        pkg.image
                            ? `data:image/png;base64,${pkg.image}`
                            : "/placeholder.png"
                    }
                    alt={pkg.firstName || "Employee Image"}
                    className="w-16 h-16 object-cover rounded-lg border"
                />
            ),
            width: 80,
        },
        {
            id: "firstName",
            label: "First Name",
            sortable: true,
        },
        {
            id: "lastName",
            label: "Last Name",
            sortable: true,
            align: "right",
        },
        {
            id: "phone",
            label: "Phone",
            align: "right",
        },
        {
            id: "position",
            label: "Position",
            sortable: true,
            align: "right",
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            render: (pkg) => (
                <EmployeeActions
                    pkg={pkg}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ),
        },
    ];
};
