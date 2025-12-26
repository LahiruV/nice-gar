import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';

export interface Column<T> {
  id: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  pagination?: boolean;
  defaultSort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
  hover?: boolean;
  className?: string;
  resetPageTrigger?: number;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  pagination = true,
  defaultSort,
  onSort,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 10,
  hover = true,
  className,
  resetPageTrigger
}: TableProps<T>) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [sortConfig, setSortConfig] = useState(defaultSort);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field: string) => {
    const isAsc = sortConfig?.field === field && sortConfig.direction === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    const newSortConfig = { field, direction: newDirection as 'asc' | 'desc' };

    setSortConfig(newSortConfig);
    onSort?.(field, newDirection);
  };

  const displayData = pagination
    ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : data;

  useEffect(() => {
    setPage(0);
  }, [resetPageTrigger]);

  return (
    <Paper className={className}>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <TableSortLabel
                      active={sortConfig?.field === column.id}
                      direction={sortConfig?.field === column.id ? sortConfig.direction : 'asc'}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row) => (
              <TableRow
                key={keyExtractor(row)}
                hover={hover}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                  >
                    {column.render ? column.render(row) : (row as any)[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}