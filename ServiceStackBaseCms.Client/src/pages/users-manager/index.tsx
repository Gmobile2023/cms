import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import IconUserPlus from "../../components/Icon/IconUserPlus";
import IconSearch from "../../components/Icon/IconSearch";
import IconUser from "../../components/Icon/IconUser";
import IconX from "../../components/Icon/IconX";
import { setPageTitle } from "@/store/slices/themeConfigSlice";
import { SelectInput } from "@/components/Form";
import { CreateUser, fetchAllUser, UpdateUser } from "@/services/usersService";

const UsersManager = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        dispatch(setPageTitle("Users Manager"));
    });

    const fetchUsers = async () => {
        try {
            const response = await fetchAllUser();
            if (response) {
                setUsers(response.response.items || []);
                // setInitialRecords(api.response.results || []);
                // console.log(response.response.items);
            } else {
                // setError(api.error);
                // console.log(error);
            }
        } catch (err) {
            console.error(err);
            // setError(err);
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const [addUserModal, setAddUserModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: null,
        userName: "",
        email: "",
        password: "",
    });

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>("");

    const [filteredItems, setFilteredItems] = useState<any>(users);

    useEffect(() => {
        setFilteredItems(() => {
            return users.filter((item: any) => {
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
        // if (!params.password) {
        //     showMessage("Password is required.", "error");
        //     return true;
        // }

        if (params.id) {
            // Update user
            let user = {
                userName: params.userName,
                email: params.email,
                // password: params.password,
            };
            const response = await UpdateUser(user);
            console.log(response);
        } else {
            let user = {
                userName: params.userName,
                email: params.email,
                password: params.password,
            };
            const response = await CreateUser(user);
            showMessage("Người dùng đã được thêm thành công!.");
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
        <div>
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">
                        Quản lý người dùng
                    </h5>
                </div>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => editUser()}
                            >
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Thêm mới
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary"
                        >
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th className="!text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((user: any, index: any) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div>{index + 1}</div>
                                            </td>
                                            <td>
                                                <div>{user.userName}</div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() =>
                                                            editUser(user)
                                                        }
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            deleteUser(user)
                                                        }
                                                    >
                                                        Xoá
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
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
                                    <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
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

                                                {/* <div className="mb-5">
                                                    <label htmlFor="email">
                                                        Password
                                                    </label>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        placeholder="Enter Password"
                                                        className="form-input"
                                                        value={params.password}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div> */}
                                                <div className="flex justify-end items-center mt-8">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() =>
                                                            setAddUserModal(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Huỷ
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                        onClick={saveUser}
                                                    >
                                                        {params.id
                                                            ? "Cập nhật"
                                                            : "Thêm mới"}
                                                    </button>
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
        </div>
    );
};

export default UsersManager;
