// TodoList.tsx
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';

interface TodoListProps {
    todos: any[];
    initialRecords: any[];
    setInitialRecords: React.Dispatch<React.SetStateAction<any[]>>;
}

const TodoList = ({ todos, initialRecords, setInitialRecords }: TodoListProps) => {
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // Handle pagination and filtering
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // Handle search filtering
    useEffect(() => {
        setInitialRecords(() => {
            return todos.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.text.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search, todos]);

    // Handle sorting
    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus, initialRecords]);

    return (
        <div className="datatables">
            <input
                type="text"
                className="form-input w-auto mb-4"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <DataTable
                className="whitespace-nowrap table-hover"
                records={recordsData}
                columns={[
                    { accessor: 'id', sortable: true },
                    { accessor: 'text', sortable: true },
                    { accessor: 'isFinished', sortable: false },
                ]}
                highlightOnHover
                totalRecords={initialRecords.length}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={(p) => setPage(p)}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
                selectedRecords={selectedRecords}
                onSelectedRecordsChange={setSelectedRecords}
                minHeight={200}
                paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
            />
        </div>
    );
};

export default TodoList;