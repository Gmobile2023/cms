import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/slices/themeConfigSlice";
import { ResponseStatus } from "@servicestack/client";
import { client } from "@/gateway";
import { QueryPages } from "@/dtos";
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';

const Pages = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle("Quản lý trang"));
    }, [dispatch]);

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

    // // Handle pagination and filtering
    // useEffect(() => {
    //     const from = (page - 1) * pageSize;
    //     const to = from + pageSize;
    //     setRecordsData([...initialRecords.slice(from, to)]);
    // }, [page, pageSize, initialRecords]);

    // // Handle search filtering
    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return todos.filter((item) => {
    //             return (
    //                 item.id.toString().includes(search.toLowerCase()) ||
    //                 item.text.toLowerCase().includes(search.toLowerCase())
    //             );
    //         });
    //     });
    // }, [search, todos]);

    // // Handle sorting
    // useEffect(() => {
    //     const data = sortBy(initialRecords, sortStatus.columnAccessor);
    //     setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    // }, [sortStatus, initialRecords]);

    const [error, setError] = useState<ResponseStatus | undefined>();
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [defaultParams] = useState({
        id: null,
        text: "",
        isFinished: "",
    });

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );

    const changeValue = (value: any, field: any) => {
        setParams({
            ...params,
            [field]: value,
        });
    };

    const fetchPages = async () => {
        setLoading(true);
        try {
            const api = await client.api(new QueryPages());
            if (api.succeeded && api.response) {
                console.log(api.response.results)
                setPages(api.response.results || []);
            } else {
                setError(api.error);
            }
        } catch (err) {
            console.error(err);
            // setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <div>
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">
                        Quản lý trang
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Pages;
