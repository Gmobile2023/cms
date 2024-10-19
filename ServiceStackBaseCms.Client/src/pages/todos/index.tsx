import { useEffect, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../store/slices/themeConfigSlice";
import { ResponseStatus } from "@servicestack/client";
import { client } from "@/gateway";
import { QueryTodos } from "@/dtos";
import { AddTodo } from "@/components/todos/AddTodo";
// import TodoList from "@/components/todos/TodoList";
import { Dialog, Transition } from "@headlessui/react";
import IconX from "../../components/Icon/IconX";
import { SelectInput } from "@/components/Form";
// import { ValidateAuth } from "@/useAuth";

const Todos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle("Todos"));
    }, [dispatch]);

    const [error, setError] = useState<ResponseStatus | undefined>();
    const [todos, setTodos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // const [initialRecords, setInitialRecords] = useState<any[]>([]);
    const [addContactModal, setAddContactModal] = useState<any>(false);
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

    const saveTodo = () => {};

    const fetchTodos = async () => {
        setLoading(true);
        try {
            const api = await client.api(new QueryTodos());
            if (api.succeeded && api.response) {
                setTodos(api.response.items || []);
                // setInitialRecords(api.response.results || []);
                // console.log(api.response.items);
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
        fetchTodos();
    }, []);

    const handleTodoAdded = () => {
        fetchTodos();
    };

    const editTodo = (todo: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (todo) {
            let json1 = JSON.parse(JSON.stringify(todo));
            setParams(json1);
        }
        setAddContactModal(true);
    };

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
                        Todos
                    </h5>
                </div>
                <AddTodo onTodoAdded={handleTodoAdded} />
                {/* <TodoList
                    todos={todos}
                    initialRecords={initialRecords}
                    setInitialRecords={setInitialRecords}
                /> */}
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Text</th>
                                    <th>Is finished</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map((todo: any) => {
                                    return (
                                        <tr key={todo.id}>
                                            <td>
                                                <div className="flex items-center w-max">
                                                    <div>{todo.id}</div>
                                                </div>
                                            </td>
                                            <td>{todo.text}</td>
                                            <td className="whitespace-nowrap">
                                                <span
                                                    className={`badge whitespace-nowrap ${
                                                        todo.isFinished
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                    }`}
                                                >
                                                    {todo.isFinished
                                                        ? "Hoàn thành"
                                                        : "Chưa hoàn thành"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            editTodo(todo)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
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
                                                    <label htmlFor="text">
                                                        Text
                                                    </label>
                                                    <input
                                                        id="text"
                                                        type="text"
                                                        placeholder="Enter Text"
                                                        className="form-input"
                                                        value={
                                                            params.text || ""
                                                        }
                                                        onChange={(e) =>
                                                            changeValue(
                                                                e.target.value,
                                                                "text"
                                                            )
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
                                                        onChange={(e) =>
                                                            changeValue(
                                                                e.target
                                                                    .value ===
                                                                    "true",
                                                                "isFinished"
                                                            )
                                                        }
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
                                                        onClick={saveTodo}
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

export default Todos;
