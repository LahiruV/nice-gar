import { PencilIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@mui/material";
import { Package, Column } from "@zenra/models";

interface PackageColumnsProps {
    handleView: (pkg: Package) => void;
    handleEdit: (pkg: Package) => void;
    handleDelete: (pkgId: string) => void;
}

/**
 * PackageActions Component
 * Handles action buttons for a single package row
 */
const PackageActions = ({
    pkg,
    handleView,
    handleEdit,
    handleDelete,
}: {
    pkg: Package;
    handleView: (pkg: Package) => void;
    handleEdit: (pkg: Package) => void;
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
 * Package Columns Definition
 */
export const packageColumns = ({
    handleView,
    handleEdit,
    handleDelete,
}: PackageColumnsProps): Column<Package>[] => {
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
                    alt={pkg.title || "Package"}
                    className="w-16 h-16 object-cover rounded-lg border"
                />
            ),
            width: 80,
        },
        {
            id: "title",
            label: "Title",
            sortable: true,
        },
        {
            id: "duration",
            label: "Duration",
            sortable: true,
            align: "right",
        },
        {
            id: "groupSize",
            label: "Group Size",
            align: "right",
        },
        {
            id: "price",
            label: "Price",
            render: (pkg) => `$${pkg.price ?? 0}`,
            sortable: true,
            align: "right",
        },
        {
            id: "actions",
            label: "Actions",
            align: "right",
            render: (pkg) => (
                <PackageActions
                    pkg={pkg}
                    handleView={handleView}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ),
        },
    ];
};
