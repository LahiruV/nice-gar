import { CheckIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@mui/material";
import { Column, PackageOutRequest } from "@zenra/models";

interface PackageOutRequestListPageColumnsProps {
    handleView: (pkg: PackageOutRequest) => void;
    handleAccept: (pkg: PackageOutRequest) => void;
    handleReject: (pkg: PackageOutRequest) => void;
    loggedEmployee: {
        employeeId: string;
        employeePosition: string;
    } | null;
}

/**
 * EmployeeActions Component
 * Handles action buttons for a single employee row
 */
const isPending = (v: number) => v === 1;
const isAccepted = (v: number) => v === 2;
// const isRejected = (v: number) => v === 3;

type Approver = 'HR' | 'GM' | 'FACTORY' | 'LSO' | 'NONE';

const getApprover = (loggedEmployee: { employeePosition: string } | null): Approver => {
    if (loggedEmployee === null) return 'HR';
    switch (loggedEmployee.employeePosition) {
        case 'General Manager':
            return 'GM';
        case 'Factory Manager':
            return 'FACTORY';
        case 'LSO Officer':
            return 'LSO';
        default:
            return 'NONE';
    }
};

const canAct = (pkg: PackageOutRequest, loggedEmployee: { employeePosition: string } | null) => {
    const who = getApprover(loggedEmployee);
    if (who === 'NONE') return false;

    const s1 = pkg.status1;
    const s2 = pkg.status2; // GM
    const s3 = pkg.status3; // Factory
    const s4 = pkg.status4; // LSO

    switch (who) {
        case 'HR':
            // HR can act only if downstream approvals haven't started
            return isPending(s2) && isPending(s3) && isPending(s4);

        case 'GM':
            // GM can act only after HR accepted, and downstream not started
            return isAccepted(s1) && isPending(s3) && isPending(s4);

        case 'FACTORY':
            // Factory can act only after HR+GM accepted, and LSO not started
            // This allows Factory to toggle 2 <-> 3 while s4 is still pending (1)
            return isAccepted(s1) && isAccepted(s2) && isPending(s4);

        case 'LSO':
            // LSO can act only after HR+GM+Factory accepted
            return isAccepted(s1) && isAccepted(s2) && isAccepted(s3);

        default:
            return false;
    }
};

const Actions = ({
    pkg,
    handleView,
    handleAccept,
    handleReject,
    loggedEmployee,
}: {
    pkg: PackageOutRequest;
    handleView: (pkg: PackageOutRequest) => void;
    handleAccept: (pkg: PackageOutRequest) => void;
    handleReject: (pkg: PackageOutRequest) => void;
    loggedEmployee: {
        employeeId: string;
        employeePosition: string;
    } | null;
}) => {
    const disabled = !canAct(pkg, loggedEmployee);

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
                onClick={() => handleAccept(pkg)}
                disabled={disabled}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
                <CheckIcon className="h-4 w-4" />
            </IconButton>

            <IconButton
                style={{ color: '#dc2626' }}
                onClick={() => handleReject(pkg)}
                disabled={disabled}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <XMarkIcon className="h-4 w-4" />
            </IconButton>
        </div>
    );
};

/**
 * Package Out Request Columns Definition
 */
export const packageOutRequestListPageColumns = ({
    handleView,
    handleAccept,
    handleReject,
    loggedEmployee,
}: PackageOutRequestListPageColumnsProps): Column<PackageOutRequest>[] => {
    return [
        // {
        //     id: "employeeName",
        //     label: "Employee Name",
        //     align: "right",
        // },
        {
            id: "packageName",
            label: "Package Name",
            align: "right",
        },
        {
            id: "date",
            label: "Date",
            align: "right",
            render: (pkg) => new Date(pkg.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
        },
        {
            id: "time",
            label: "Time",
            align: "right",
        },
        {
            id: "location",
            label: "Location",
            align: "right",
        },
        // {
        //     id: "packageDetails",
        //     label: "Package Details",
        //     align: "right",
        // },
        {
            id: "status1",
            label: "HR Manager Status",
            align: "right",
            render: (pkg) => {
                const statuses = [pkg.status1];
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
                    <span className={`px-3 py-1 rounded-full text-md font-medium ${chipClass}`}>
                        {statusText}
                    </span>
                );
            },
        },
        {
            id: "status2",
            label: "General Manager Status",
            align: "right",
            render: (pkg) => {
                const statuses = [pkg.status2];
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
                    <span className={`px-3 py-1 rounded-full text-md font-medium ${chipClass}`}>
                        {statusText}
                    </span>
                );
            },
        },
        {
            id: "status3",
            label: "Factory Manager Status",
            align: "right",
            render: (pkg) => {
                const statuses = [pkg.status3];
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
                    <span className={`px-3 py-1 rounded-full text-md font-medium ${chipClass}`}>
                        {statusText}
                    </span>
                );
            },
        },
        {
            id: "status4",
            label: "LSO Manager Status",
            align: "right",
            render: (pkg) => {
                const statuses = [pkg.status4];
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
                    <span className={`px-3 py-1 rounded-full text-md font-medium ${chipClass}`}>
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
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                    loggedEmployee={loggedEmployee}
                />
            ),
        },
    ];
};
