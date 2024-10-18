import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from "../../store/slices/themeConfigSlice";
import IconX from '@/components/Icon/IconX';
import IconSave from '@/components/Icon/IconSave';
import IconSend from '@/components/Icon/IconSend';
import IconEye from '@/components/Icon/IconEye';
import IconDownload from '@/components/Icon/IconDownload';
import { SelectInput, TextInput } from '@/components/Form';

const NewPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Thêm mới'));
    });

    const [items, setItems] = useState<any>([
        {
            id: 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        },
    ]);

    const addItem = () => {
        let maxId = 0;
        maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;

        setItems([...items, { id: maxId + 1, title: '', description: '', rate: 0, quantity: 0, amount: 0 }]);
    };

    const removeItem = (item: any = null) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeQuantityPrice = (type: string, value: string, id: number) => {
        const list = items;
        const item = list.find((d: any) => d.id === id);
        if (type === 'quantity') {
            item.quantity = Number(value);
        }
        if (type === 'price') {
            item.amount = Number(value);
        }
        setItems([...list]);
    };

    return (
        <div className="flex xl:flex-row flex-col gap-2.5">
            <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
            <div className="mt-8 px-4">
                    <TextInput
                        id="title"
                        help="Your first and last name"
                        autoComplete="title"
                        label="Tiêu đề"
                        className="form-input flex-1"
                    />
                </div>
                <div className="mt-8 px-4">
                    <label htmlFor="notes">Notes</label>
                    <textarea id="notes" name="notes" className="form-textarea min-h-[130px]" placeholder="Notes...."></textarea>
                </div>
            </div>
            <div className="xl:w-96 w-full xl:mt-0 mt-6">
                <div className="panel mb-5">
                    <div className="mt-4">
                        <label className="required" htmlFor="status">Trạng thái</label>
                        <SelectInput
                            id="status"
                            label=""
                            className="form-select"
                            options={{
                                0: "Nháp",
                                1: "Xuất bản",
                            }}
                        ></SelectInput>
                    </div>
                </div>
                <div className="panel">
                    <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        <button type="button" className="btn btn-success w-full gap-2">
                            Lưu & Xuất bản
                        </button>

                        <Link to="/apps/invoice/preview" className="btn btn-primary w-full gap-2">
                            Lưu bản nháp
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPage;