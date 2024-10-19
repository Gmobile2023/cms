import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/slices/themeConfigSlice";
import { ResponseStatus } from "@servicestack/client";
import { client } from "@/gateway";
import { QueryPages } from "@/dtos";
import { Menu, Button } from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { ValidateAuth } from "@/useAuth";
import { debounce } from 'lodash';
import moment from 'moment';
import { Loading } from "@/components/Form";
import { Link } from "react-router-dom";

const Pages = () => {
    const dispatch = useDispatch();
    const isFetchingRef = useRef(false); // Use ref to track fetching state

    useEffect(() => {
        dispatch(setPageTitle("Quản lý trang"));
    }, [dispatch]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [recordsData, setRecordsData] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });
    const [totalRecords, setTotalRecords] = useState(0);
    const [error, setError] = useState<ResponseStatus | undefined>();
    const [loading, setLoading] = useState(true);

    const calculateSkip = () => (page - 1) * pageSize;

    const fetchPages = async () => {
        if (isFetchingRef.current) return; // Prevent multiple calls
        isFetchingRef.current = true; // Mark fetching in progress
        setLoading(true);

        try {
            const skip = calculateSkip();
            const take = pageSize;

            const api = await client.api(new QueryPages({
                skip: skip,
                take: take
            }));

            if (api.succeeded && api.response) {
                setRecordsData(api.response.results || []);
                setTotalRecords(api.response.total || 0);
            } else {
                setError(api.error);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            isFetchingRef.current = false; // Mark fetching completed
        }
    };

    useEffect(() => {
        fetchPages();
    }, [page, pageSize]); // Call when page or pageSize changes

    // Debounced search function
    const handleSearch = debounce((searchValue: string) => {
        setSearch(searchValue);
        setPage(1); // Reset to first page when searching
        fetchPages(); // Fetch data based on search input
    }, 300);

    // Use effect to handle search input
    useEffect(() => {
        if (search.length > 0) {
            handleSearch(search);
        } else {
            fetchPages(); // Fetch all pages if search is cleared
        }
    }, [search]); // Call fetchPages when search changes

    // Handle sorting
    useEffect(() => {
        const data = sortBy(recordsData, sortStatus.columnAccessor);
        setRecordsData(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    if (loading) {
        return <Loading className="py-2 pl-4" text="Vui lòng chờ một chút ..." />;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    const handleView = (record: any) => {
        console.log("View record:", record);
    };

    const handleEdit = (record: any) => {
        console.log("Edit record:", record);
    };

    const handleDelete = (record: any) => {
        console.log("Delete record:", record);
    };

    const getBadge = (status: string) => {
        switch (status) {
            case 1:
                return <span className="badge bg-success w-full">Đã xuất bản</span>;
            case 2:
                return <span className="badge bg-danger w-full">Đã xoá</span>;
            case 0:
                return <span className="badge bg-secondary w-full">Nháp</span>;
            // Add more cases as needed
            default:
                return <span className="badge bg-secondary w-full">Unknown</span>;
        }
    };

    return (
        <div>
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">
                        Quản lý trang
                    </h5>
                    <div className="ml-auto">
                        <Link to="/pages/new" className="jusity-content-end">
                            <Button variant="filled" color="blue">
                                Thêm mới
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="datatables">
                    <input
                        type="text"
                        className="form-input w-auto mb-4"
                        placeholder="Tìm kiếm..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <DataTable
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'action',
                                title: 'Hành động',
                                render: (record) => (
                                    <Menu>
                                        <Menu.Target>
                                            <Button size="xs">Hành động</Button>
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item onClick={() => handleView(record)}>Xem chi tiết</Menu.Item>
                                            <Menu.Item onClick={() => handleEdit(record)}>Chỉnh sửa</Menu.Item>
                                            <Menu.Item color="red" onClick={() => handleDelete(record)}>Xoá</Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                ),
                            },
                            { accessor: 'title', sortable: true, title: 'Tiêu đề' },
                            {
                                accessor: 'status',
                                sortable: true,
                                title: 'Trạng thái',
                                render: (record) => getBadge(record.status), // Render badge
                            },
                            { accessor: 'createdBy', sortable: true, title: 'Người tạo' },
                            {
                                accessor: 'createdDate',
                                sortable: true,
                                title: 'Ngày tạo',
                                render: (record) => moment(record.createdDate).format('DD/MM/YYYY HH:mm'), // Format date
                            },
                        ]}
                        highlightOnHover
                        totalRecords={totalRecords}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Hiển thị ${from} - ${to} / ${totalRecords} kết quả`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ValidateAuth(Pages);