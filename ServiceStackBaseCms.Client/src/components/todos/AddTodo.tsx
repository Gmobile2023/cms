import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import { RootState } from '../../store/root'; // Import RootState
import { updateTodo, resetTodo } from '../../store/slices/todoSlice'; // Import the actions
import IconX from '../Icon/IconX';
import { SelectInput, TextInput } from '../Form';
import { createTodo } from '@/services/todoService';

export const AddTodo = ({ onTodoAdded }: { onTodoAdded: () => void }) => {
    const dispatch = useDispatch();
    
    const todo = useSelector((state: RootState) => state.todos);

    useEffect(() => {
        dispatch(setPageTitle('Todos'));
    }, [dispatch]);

    const [modal, setModal] = useState(false);
    const [text, setText] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (field: keyof typeof todo, value: any) => {
        dispatch(updateTodo({ field, value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await createTodo(todo);

        if (response.success) {
            console.log('Todo created successfully:', response.response);
            setModal(false); 

            setText('');
            setIsFinished(false);
            onTodoAdded();
        } else {
            // Handle error
            setError(response.error || 'Failed to create todo');
            console.error('Error creating todo:', response.error);
        }
        
        setModal(false);
    };

    return (
    <section className="p-3">
        <button type="button" className="btn btn-primary" onClick={() => setModal(true)}>
            Add Todo
        </button>
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
                <div id="add_todo_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
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
                            <Dialog.Panel className="panel my-8 w-full max-w-sm overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                    <h5>Add Todo</h5>
                                    <button type="button" onClick={() => setModal(false)} className="text-white-dark hover:text-dark">
                                        <IconX className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div>{error}</div>
                                        <div className="relative mb-4">
                                            <TextInput
                                                type="text"
                                                placeholder="Todo Text"
                                                className="form-input"
                                                value={todo.text} // Bind Redux state
                                                onChange={(e) => handleInputChange('text', e.target.value)} // Dispatch change
                                            />
                                        </div>
                                        <div className="relative mb-4">
                                            <SelectInput
                                                value={todo.isFinished ? "true" : "false"}
                                                onChange={(e) => handleInputChange('isFinished', e.target.value === "true")}
                                                className="form-select"
                                                options={{
                                                    true: "Finished",
                                                    false: "Not Finished",
                                                }}
                                            >
                                            </SelectInput>
                                        </div>
                                        <button type="submit" className="btn btn-primary w-full">
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
    </section>
    );
};