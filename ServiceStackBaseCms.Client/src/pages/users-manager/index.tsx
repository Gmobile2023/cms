import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import IconX from "../../components/Icon/IconX";
import { setPageTitle } from "@/store/slices/themeConfigSlice";
import { SelectInput } from "@/components/Form";
import { CreateUser, fetchAllUser, UpdateUser } from "@/services/usersService";
import { getRoles } from "@/services/rolesService";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu } from "@mantine/core";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import moment from "moment";
import Select from "react-select";
import { client } from "@/gateway";
import { User, UsersRequest } from "@/dtos";
import sortBy from "lodash/sortBy";

const PAGE_SIZES = [5, 10, 20];

const UsersManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(users.slice(0, pageSize));
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "id",
        direction: "asc",
    });
    const [roles, setRoles] = useState<any[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [totalRecords, setTotalRecords] = useState(0);
    const [addUserModal, setAddUserModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: null,
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        roleName: [],
    });
    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );
    const [selectedRoles, setSelectedRoles] = useState<string[]>(
        params.roleName || []
    );

    useEffect(() => {
        dispatch(setPageTitle("Users Manager"));
    });

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(users.slice(from, to));
    }, [users, page, pageSize]);

    // useEffect(() => {
    //     const data = sortBy(users, sortStatus.columnAccessor);
    //     setRecordsData(sortStatus.direction === "desc" ? data.reverse() : data);
    // }, [sortStatus]);

    const fetchUsers = async () => {
        try {
            const api = await client.api<any>(new UsersRequest());
            if (api.succeeded && api.response) {
                setUsers(api.response.results || []);
                setTotalRecords(api.response.total || 0);
            }
        } catch (err) {
            console.error(err);
            // setError(err);
        } finally {
            // setLoading(false);
        }
    };

    const getAllRoles = async () => {
        try {
            const api = await getRoles();
            if (api.success && api.response) {
                setRoles(api.response.results || []);
            } else {
                console.log(api.error);
            }
        } catch (err) {
            console.error(err);
            // setError(err);
        } finally {
            // setLoading(false);
        }
    };

    const handleView = (record: any) => {
        console.log("View record:", record);
    };

    useEffect(() => {
        fetchUsers();
        getAllRoles();
    }, []);

    useEffect(() => {
        if (params.roleName) {
            setSelectedRoles(params.roleName);
        }
    }, [params]);

    const handleRoleChange = (role: string) => {
        setSelectedRoles((prevSelectedRoles) => {
            const isRoleSelected = prevSelectedRoles.includes(role);
            const updatedRoles = isRoleSelected
                ? prevSelectedRoles.filter((r) => r !== role) // Xóa role
                : [...prevSelectedRoles, role]; // Thêm role

            return updatedRoles;
        });
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>("");

    const [filteredItems, setFilteredItems] = useState<any>(users);

    useEffect(() => {
        setFilteredItems(() => {
            return users.filter((item: any) => {
                // console.log(item);
                return item.userName
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
        });
    }, [search, users]);

    const saveUser = async () => {
        if (!params.userName) {
            showMessage("Name is required.", "error");
            return true;
        }
        if (!params.email) {
            showMessage("Email is required.", "error");
            return true;
        }
        params.roleName = selectedRoles;

        if (params.id) {
            // Update user
            let user = {
                id: params.id,
                firstName: params.firstName,
                lastName: params.lastName,
                userName: params.userName,
                email: params.email,
                roles: selectedRoles,
            };
            const response = await UpdateUser(user);
            if (response.success) {
                showMessage("Cập nhật người dùng thành công!");
                fetchUsers();
            }
        } else {
            let user = {
                firstName: params.firstName,
                lastName: params.lastName,
                userName: params.userName,
                email: params.email,
                password: params.password,
                roles: selectedRoles,
            };
            const response = await CreateUser(user);
            if (response.success) {
                showMessage("Người dùng đã được thêm thành công!.");
                fetchUsers();
            }
        }
        setAddUserModal(false);
    };

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddUserModal(true);
    };

    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage("Người dùng đã được xoá thành công!");
    };

    const showMessage = (msg = "", type = "success") => {
        const toast: any = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: "toast" },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: "10px 20px",
        });
    };

    return (
        <>
            <div>
                <div className="panel">
                    <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">
                            Quản lý người dùng
                        </h5>
                        <div className="ml-auto">
                            <Button
                                variant="filled"
                                color="blue"
                                onClick={() => editUser()}
                            >
                                Thêm mới
                            </Button>
                        </div>
                    </div>
                    <div className="datatables">
                        <input
                            type="text"
                            className="form-input w-auto mb-4"
                            placeholder="Tìm kiếm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <DataTable
                            className="whitespace-nowrap table-hover"
                            records={records}
                            columns={[
                                {
                                    accessor: "action",
                                    title: "Hành động",
                                    render: (record) => (
                                        <Menu>
                                            <Menu.Target>
                                                <Button size="xs">
                                                    Hành động
                                                </Button>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item
                                                    onClick={() =>
                                                        handleView(record)
                                                    }
                                                >
                                                    Xem chi tiết
                                                </Menu.Item>
                                                <Menu.Item
                                                    onClick={() =>
                                                        editUser(record)
                                                    }
                                                >
                                                    Chỉnh sửa
                                                </Menu.Item>
                                                <Menu.Item
                                                    color="red"
                                                    onClick={() =>
                                                        deleteUser(record)
                                                    }
                                                >
                                                    Xoá
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    ),
                                },
                                {
                                    accessor: "userName",
                                    sortable: true,
                                    title: "Tên",
                                },
                                {
                                    accessor: "email",
                                    sortable: true,
                                    title: "Email",
                                },
                            ]}
                            highlightOnHover
                            totalRecords={totalRecords}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            // sortStatus={sortStatus}
                            // onSortStatusChange={setSortStatus}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) =>
                                `Hiển thị ${from} - ${to} / ${totalRecords} kết quả`
                            }
                        />
                    </div>
                </div>
                <Transition appear show={addUserModal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={addUserModal}
                        onClose={() => setAddUserModal(false)}
                        className="relative z-[51]"
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-[black]/60" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center px-4 py-8">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-2xl text-black dark:text-white-dark">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAddUserModal(false)
                                            }
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            {!params.id
                                                ? "Thêm người dùng"
                                                : "Sửa người dùng"}
                                        </div>
                                        <div className="p-5">
                                            <form>
                                                <div className="mb-5">
                                                    <label htmlFor="lastName">
                                                        Họ
                                                    </label>
                                                    <input
                                                        id="lastName"
                                                        type="text"
                                                        placeholder="Nhập họ"
                                                        className="form-input"
                                                        value={params.lastName}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="firstName">
                                                        Tên
                                                    </label>
                                                    <input
                                                        id="firstName"
                                                        type="text"
                                                        placeholder="Nhập tên"
                                                        className="form-input"
                                                        value={params.firstName}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="userName">
                                                        Tên người dùng
                                                    </label>
                                                    <input
                                                        id="userName"
                                                        type="text"
                                                        placeholder="Nhập tên người dùng"
                                                        className="form-input"
                                                        value={params.userName}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Nhập email"
                                                        className="form-input"
                                                        value={params.email}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                {!params.id && (
                                                    <div className="mb-5">
                                                        <label htmlFor="password">
                                                            Mật khẩu
                                                        </label>
                                                        <input
                                                            id="password"
                                                            type="password"
                                                            placeholder="Nhập mật khẩu"
                                                            className="form-input"
                                                            value={
                                                                params.password
                                                            }
                                                            onChange={(e) =>
                                                                changeValue(e)
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <div className="mb-5">
                                                    <label htmlFor="role">
                                                        Role
                                                    </label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                                        {roles.map(
                                                            (
                                                                role: any,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <label
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="inline-flex"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-checkbox text-info"
                                                                            checked={selectedRoles.includes(
                                                                                role.name
                                                                            )}
                                                                            onChange={() =>
                                                                                handleRoleChange(
                                                                                    role.name
                                                                                )
                                                                            }
                                                                        />
                                                                        <span>
                                                                            {
                                                                                role.name
                                                                            }
                                                                        </span>
                                                                    </label>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <Button
                                                        variant="filled"
                                                        color="gray"
                                                        onClick={() =>
                                                            setAddUserModal(
                                                                false
                                                            )
                                                        }
                                                        className="me-2"
                                                    >
                                                        Huỷ
                                                    </Button>
                                                    <Button
                                                        variant="filled"
                                                        color="blue"
                                                        onClick={saveUser}
                                                    >
                                                        {params.id
                                                            ? "Cập nhật"
                                                            : "Thêm mới"}
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
};

export default UsersManager;
