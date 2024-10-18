import { setPageTitle } from "@/store/slices/themeConfigSlice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import IconX from "@/components/Icon/IconX";
import { TextInput } from "@/components/Form";

const tableData = [
    {
        id: 1,
        name: "Admin",
    },
    {
        id: 2,
        name: "Manager",
    },
];
const Roles = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(setPageTitle("Roles Manager"));
    });

    const handleSubmit = () => {};

    const openModal = () => {
        setModal(true);
    };

    return (
        <>
            <div className="panel">
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">
                        Roles Manager
                    </h5>
                </div>
                <button
                    type="button"
                    className="btn btn-primary me-4"
                    onClick={openModal}
                >
                    Add Role
                </button>
                <div className="flex justify-between gap-5 mt-8">
                    {/* Bảng Roles */}
                    <div className="w-full md:w-1/2 mb-5">
                        <div className="mt-5 panel p-0 border-0 overflow-hidden">
                            <div className="table-responsive">
                                <table className="table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th className="float-end">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((perm: any) => {
                                            return (
                                                <tr key={perm.id}>
                                                    <td>
                                                        <div className="flex items-center w-max">
                                                            <div>{perm.id}</div>
                                                        </div>
                                                    </td>
                                                    <td>{perm.name}</td>

                                                    <td className="float-end">
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                console.log(
                                                                    "Delete"
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Transition appear show={modal} as={Fragment}>
                    <Dialog
                        as="div"
                        open={modal}
                        onClose={() => {
                            setModal(false);
                        }}
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
                            <div className="fixed inset-0" />
                        </Transition.Child>
                        <div
                            id="add_todo_modal"
                            className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60"
                        >
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel my-8 w-full max-w-2xl overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                            <h5>Add Role</h5>
                                            <button
                                                type="button"
                                                onClick={() => setModal(false)}
                                                className="text-white-dark hover:text-dark"
                                            >
                                                <IconX className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form onSubmit={handleSubmit}>
                                                {/* <div>{error}</div> */}
                                                <div className="relative mb-4">
                                                    <TextInput
                                                        type="text"
                                                        placeholder="Text"
                                                        className="form-input"
                                                        value=""
                                                        // onChange={(e) => handleInputChange('text', e.target.value)}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>
                                                            Accounts Manager
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>
                                                            Dashboard Manager
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>
                                                            Sales Manager
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>Blogger</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>Blogger</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>
                                                            Sales Manager
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>
                                                            Dashboard Manager
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-warning"
                                                        />
                                                        <span>
                                                            Accounts Manager
                                                        </span>
                                                    </label>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary w-full"
                                                >
                                                    Submit
                                                </button>
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

export default Roles;
