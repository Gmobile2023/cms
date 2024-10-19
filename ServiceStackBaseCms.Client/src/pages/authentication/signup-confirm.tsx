import Page from "@/components/LayoutPage";
import { useSearchParams } from "react-router-dom";

const SignupConfirm = () => {
    const [query, _] = useSearchParams();
    const confirmLink = query.get("confirmLink");

    return (
        <Page title="Xác nhận đăng ký" className="max-w-lg">
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
                                <div className="mt-24 hidden w-full max-w-[430px] lg:block">
                                    <img
                                        src="/assets/images/auth/login.svg"
                                        alt="Cover Image"
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                            <div className="w-full max-w-[440px] lg:mt-16">
                                <div className="mb-7">
                                    <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">
                                        Xác nhận đăng ký
                                    </h1>
                                    <p>
                                        {!confirmLink
                                            ? "Vui lòng kiểm tra email để xác nhận tài khoản của bạn."
                                            : "Thông thường liên kết kích hoạt sẽ được gửi qua email"}
                                    </p>
                                </div>
                                <form className="space-y-5">
                                    <a id="confirm-link" href={confirmLink}>
                                        <button
                                            type="submit"
                                            className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                        >
                                            Click để xác nhận tài khoản của bạn
                                        </button>
                                    </a>
                                </form>
                            </div>
                            <form className="space-y-5">
                                <a id="confirm-link" href={confirmLink}>
                                    <button
                                        type="button"
                                        className="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
                                    >
                                        Click để xác nhận tài khoản của bạn
                                    </button>
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default SignupConfirm;
