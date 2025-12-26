export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
    field: keyof T;
    direction: SortDirection;
}

export const sortArray = <T>(
    array: T[],
    config: SortConfig<T>
): T[] => {
    const sorted = [...array];

    sorted.sort((a, b) => {
        const aVal = a[config.field];
        const bVal = b[config.field];

        if (aVal === undefined || aVal === null) return 1;
        if (bVal === undefined || bVal === null) return -1;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return config.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        return config.direction === 'asc'
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
    });

    return sorted;
};