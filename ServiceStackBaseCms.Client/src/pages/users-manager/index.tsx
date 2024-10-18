import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import IconUserPlus from "../../components/Icon/IconUserPlus";
import IconSearch from "../../components/Icon/IconSearch";
import IconUser from "../../components/Icon/IconUser";
import IconX from "../../components/Icon/IconX";
import { setPageTitle } from "@/store/slices/themeConfigSlice";
import { client } from "@/gateway";
import { QueryTodos } from "@/dtos";
import { JsonServiceClient } from "@servicestack/client";
import { SelectInput } from "@/components/Form";

const UsersManager = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle("Users Manager"));
    });

    const API_URL = "https://localhost:5001/api";
    const client = new JsonServiceClient(API_URL);

    const fetchUsers = async () => {
        // setLoading(true);
        try {
            const response = await client.get<any>("/AdminQueryUsers");
            if (response) {
                // setTodos(api.response.results || []);
                // setInitialRecords(api.response.results || []);
                console.log(response);
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
        // fetchUsers();
    }, []);

    const [addContactModal, setAddContactModal] = useState<any>(false);

    const [defaultParams] = useState({
        id: null,
        name: "",
        email: "",
        phone: "",
        role: "",
        location: "",
    });

    const [params, setParams] = useState<any>(
        JSON.parse(JSON.stringify(defaultParams))
    );

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>("");
    const [contactList] = useState<any>([
        {
            id: 1,
            path: "profile-35.png",
            name: "Alan Green",
            role: "Web Developer",
            email: "alan@mail.com",
            location: "Boston, USA",
            phone: "+1 202 555 0197",
            posts: 25,
            followers: "5K",
            following: 500,
        },
        {
            id: 2,
            path: "profile-35.png",
            name: "Linda Nelson",
            role: "Web Designer",
            email: "linda@mail.com",
            location: "Sydney, Australia",
            phone: "+1 202 555 0170",
            posts: 25,
            followers: "21.5K",
            following: 350,
        },
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

    const saveUser = () => {
        if (!params.name) {
            showMessage("Name is required.", "error");
            return true;
        }
        if (!params.email) {
            showMessage("Email is required.", "error");
            return true;
        }
        if (!params.phone) {
            showMessage("Phone is required.", "error");
            return true;
        }
        if (!params.role) {
            showMessage("Occupation is required.", "error");
            return true;
        }

        if (params.id) {
            //update user
            let user: any = filteredItems.find((d: any) => d.id === params.id);
            user.name = params.name;
            user.email = params.email;
            user.phone = params.phone;
            user.role = params.role;
            user.location = params.location;
        } else {
            //add user
            let maxUserId = filteredItems.length
                ? filteredItems.reduce(
                      (max: any, character: any) =>
                          character.id > max ? character.id : max,
                      filteredItems[0].id
                  )
                : 0;

            let user = {
                id: maxUserId + 1,
                path: "profile-35.png",
                name: params.name,
                email: params.email,
                phone: params.phone,
                role: params.role,
                location: params.location,
                posts: 20,
                followers: "5K",
                following: 500,
            };
            filteredItems.splice(0, 0, user);
            //   searchContacts();
        }

        showMessage("User has been saved successfully.");
        setAddContactModal(false);
    };

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddContactModal(true);
    };

    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage("User has been deleted successfully.");
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
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Địa chỉ</th>
                                    <th>Số điện thoại</th>
                                    <th className="!text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact: any) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>
                                                <div className="flex items-center w-max">
                                                    {contact.path && (
                                                        <div className="w-max">
                                                            <img
                                                                src={`/assets/images/${contact.path}`}
                                                                className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                    )}
                                                    {!contact.path &&
                                                        contact.name && (
                                                            <div className="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"></div>
                                                        )}
                                                    {!contact.path &&
                                                        !contact.name && (
                                                            <div className="border border-gray-300 dark:border-gray-800 rounded-full p-2 ltr:mr-2 rtl:ml-2">
                                                                <IconUser className="w-4.5 h-4.5" />
                                                            </div>
                                                        )}
                                                    <div>{contact.name}</div>
                                                </div>
                                            </td>
                                            <td>{contact.email}</td>
                                            <td className="whitespace-nowrap">
                                                {contact.location}
                                            </td>
                                            <td className="whitespace-nowrap">
                                                {contact.phone}
                                            </td>
                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() =>
                                                            editUser(contact)
                                                        }
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            deleteUser(contact)
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
                <Transition appear show={addContactModal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={addContactModal}
                        onClose={() => setAddContactModal(false)}
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
                                                setAddContactModal(false)
                                            }
                                            className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                        >
                                            <IconX />
                                        </button>
                                        <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                            {params.id
                                                ? "Edit Contact"
                                                : "Add Contact"}
                                        </div>
                                        <div className="p-5">
                                            <form>
                                                <div className="mb-5">
                                                    <label htmlFor="name">
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        placeholder="Enter Name"
                                                        className="form-input"
                                                        value={params.name}
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
                                                        placeholder="Enter Email"
                                                        className="form-input"
                                                        value={params.email}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="number">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        type="text"
                                                        placeholder="Enter Phone Number"
                                                        className="form-input"
                                                        value={params.phone}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="occupation">
                                                        Occupation
                                                    </label>
                                                    <input
                                                        id="role"
                                                        type="text"
                                                        placeholder="Enter Occupation"
                                                        className="form-input"
                                                        value={params.role}
                                                        onChange={(e) =>
                                                            changeValue(e)
                                                        }
                                                    />
                                                </div>
                                                <div className="mb-5">
                                                    <label htmlFor="isFinished">
                                                        Is finished
                                                    </label>
                                                    <SelectInput
                                                        value={
                                                            params.isFinished
                                                                ? "true"
                                                                : "false"
                                                        }
                                                        // onChange={(e) => handleInputChange('isFinished', e.target.value === "true")}
                                                        className="form-select"
                                                        options={{
                                                            true: "Finished",
                                                            false: "Not Finished",
                                                        }}
                                                    ></SelectInput>
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                        onClick={() =>
                                                            setAddContactModal(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary ltr:ml-4 rtl:mr-4"
                                                        onClick={saveUser}
                                                    >
                                                        {params.id
                                                            ? "Update"
                                                            : "Add"}
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
