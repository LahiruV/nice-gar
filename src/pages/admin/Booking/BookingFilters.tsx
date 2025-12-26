import {
    Paper,
    Grid,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { TextField } from '@zenra/widgets';
import { Booking, Filters } from "@zenra/models";

export const BookingFilters = ({
    filters,
    onChange,
    onClear,
    packages,
}: {
    filters: Filters;
    onChange: (name: keyof Filters, value: string) => void;
    onClear: () => void;
    packages: string[];
}) => (
    <Paper className="p-4 mb-4">
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filters.status}
                        label="Status"
                        onChange={(e) => onChange('status', e.target.value)}
                    >
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                    <InputLabel>Package</InputLabel>
                    <Select
                        value={filters.packageName}
                        label="Package"
                        onChange={(e) => onChange('packageName', e.target.value)}
                    >
                        <MenuItem value="all">All Packages</MenuItem>
                        {packages.map((pkg) => (
                            <MenuItem key={pkg} value={pkg}>
                                {pkg}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
                <TextField
                    type="date"
                    label="Start Date"
                    value={filters.startDate}
                    onChange={(e) => onChange('startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    type="date"
                    label="End Date"
                    value={filters.endDate}
                    onChange={(e) => onChange('endDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <TextField
                    label="Search"
                    value={filters.search}
                    onChange={(e) => onChange('search', e.target.value)}
                    placeholder="Search bookings..."
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            <Grid item xs={12} className="flex justify-end mt-2">
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
                    style={{
                        color: 'white',
                    }}
                    onClick={onClear}
                >
                    Clear All Filters
                </button>
            </Grid>
        </Grid>
    </Paper>
);

export const getStatusColor = (status: Booking['status'] | string) => {
    switch (status) {
        case 'confirmed':
            return 'success';
        case 'pending':
            return 'warning';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};