import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useEffect,
    useState,
} from "react";
import {
    serializeToObject,
    leftPart,
    rightPart,
    toPascalCase,
} from "@servicestack/client";
import { Link, useNavigate } from "react-router-dom";

import Page from "@/components/LayoutPage";
import {
    FormLoading,
    ErrorSummary,
    TextInput,
    Checkbox,
    getRedirect,
    ApiContext,
} from "@/components/Form";
import { Button } from "@/components/ui/button";
import { useClient } from "@/gateway";
import { Register, RegisterResponse } from "@/dtos";
import { useAuth, Redirecting } from "@/useAuth";
import { useSearchParams } from "react-router-dom";

const Signup = () => {
    const client = useClient();
    const [displayName, setDisplayName] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const { signedIn, revalidate } = useAuth();
    useEffect(() => {
        if (signedIn) navigate(getRedirect(searchParams) || "/");
    }, [signedIn]);
    if (signedIn) return <Redirecting />;

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { displayName, userName, password, confirmPassword, autoLogin } =
            serializeToObject(e.currentTarget);
        if (password !== confirmPassword) {
            client.setError({
                fieldName: "confirmPassword",
                message: "Mật khẩu không khớp",
            });
            return;
        }

        const api = await client.api(
            new Register({
                displayName,
                email: userName,
                password,
                confirmPassword,
                autoLogin,
            })
        );
        if (api.succeeded) {
            await revalidate();
            const redirectUrl = (api.response as RegisterResponse).redirectUrl;
            if (redirectUrl) {
                location.href = redirectUrl;
            } else {
                navigate("/signin");
            }
        }
    };

    const change =
        (setField: Dispatch<SetStateAction<string | undefined>>) =>
        (e: ChangeEvent<HTMLInputElement>) =>
            setField(e.target.value);

    return (
        <Page title="Sign Up" className="max-w-lg">
            <ApiContext.Provider value={client}>
                <div>
                    <div className="absolute inset-0">
                        <img
                            src="/assets/images/auth/bg-gradient.png"
                            alt="image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                        <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[758px] lg:flex-row lg:gap-10 xl:gap-0">
                            <div className="relative hidden w-full items-center justify-center bg-[linear-gradient(225deg,rgba(255,197,0,1)_0%,rgba(253,138,0,1)_100%)] p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
                                <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
                                <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
                                    {/* <Link to="/" className="w-48 block lg:w-72 ms-10">
                                    <img src="/assets/images/logo.png" alt="Logo" />
                                </Link> */}
                                    <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                        <img
                                            src="/assets/images/auth/register.svg"
                                            alt="Cover Image"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                                <div className="w-full max-w-[440px] lg:mt-16">
                                    <div className="mb-10">
                                        <h1 className="text-3xl font-bold uppercase !leading-snug text-primary md:text-4xl">
                                            Đăng ký
                                        </h1>
                                        <p className="text-base font-normal leading-normal text-white-dark">
                                            Vui lòng đăng ký để sử dụng
                                        </p>
                                    </div>
                                    <form
                                        className="space-y-5 dark:text-white"
                                        onSubmit={onSubmit}
                                    >
                                        <ErrorSummary except="displayName,userName,password,confirmPassword" />
                                        <div>
                                            <div className="relative text-white-dark">
                                                <TextInput
                                                    type="text"
                                                    id="Name"
                                                    label="Họ tên"
                                                    placeholder="Nhập Họ tên"
                                                    className="form-input placeholder:text-white-dark"
                                                    value={displayName}
                                                    onChange={change(
                                                        setDisplayName
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="relative text-white-dark">
                                                <TextInput
                                                    type="email"
                                                    id="userName"
                                                    label="Email"
                                                    placeholder="Nhập Email"
                                                    autoComplete="email"
                                                    className="form-input placeholder:text-white-dark"
                                                    value={username}
                                                    onChange={change(
                                                        setUsername
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="relative text-white-dark">
                                                <TextInput
                                                    type="password"
                                                    id="password"
                                                    label="Mật khẩu"
                                                    placeholder="Nhập mật khẩu"
                                                    className="form-input placeholder:text-white-dark"
                                                    value={password}
                                                    autoComplete="current-password"
                                                    onChange={change(
                                                        setPassword
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="relative text-white-dark">
                                                <TextInput
                                                    type="password"
                                                    id="confirmPassword"
                                                    label="Xác nhận mật khẩu"
                                                    placeholder="Nhập mật khẩu"
                                                    className="form-input placeholder:text-white-dark"
                                                    value={confirmPassword}
                                                    autoComplete="new-password"
                                                    onChange={change(
                                                        setConfirmPassword
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="flex cursor-pointer items-center">
                                                <Checkbox
                                                    label="Đăng nhập tự động"
                                                    id="autoLogin"
                                                />
                                            </label>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                        >
                                            Đăng ký
                                        </button>
                                    </form>

                                    <div className="relative my-7 text-center md:mb-9">
                                        <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                    </div>

                                    <div className="text-center dark:text-white">
                                        Bạn đã có tài khoản?
                                        <Link
                                            to="/signin"
                                            className="uppercase text-primary font-medium transition hover:text-black dark:hover:text-white pl-1"
                                        >
                                            Đăng nhập ngay
                                        </Link>
                                    </div>
                                </div>
                                <p className="absolute bottom-6 w-full text-center dark:text-white">
                                    © {new Date().getFullYear()}. Gmobile JSC
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ApiContext.Provider>
        </Page>
    );
};

export default Signup;
