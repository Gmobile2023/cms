﻿import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { RootState } from '@/store/root';
import { toggleTheme, toggleSidebar } from '../../store/slices/themeConfigSlice';
import { useAuth } from "@/useAuth"
import Dropdown from '../Dropdown';
import IconLogout from '../Icon/IconLogout';
import IconUser from '../Icon/IconUser';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconXCircle from '../Icon/IconXCircle';
import IconBellBing from '../Icon/IconBellBing';
import IconLaptop from '../Icon/IconLaptop';
import IconMoon from '../Icon/IconMoon';
import IconSun from '../Icon/IconSun';
import IconEdit from '../Icon/IconEdit';
import IconCalendar from '../Icon/IconCalendar';
import IconMenu from '../Icon/IconMenu';

const Header = () => {
    const location = useLocation();
    const { auth, signout } = useAuth();

    useEffect(() => {
        const selector = document.querySelector(
            'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
        );
        if (selector) {
            selector.classList.add("active");
            const all: any = document.querySelectorAll(
                "ul.horizontal-menu .nav-link.active"
            );
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove("active");
            }
            const ul: any = selector.closest("ul.sub-menu");
            if (ul) {
                let ele: any = ul
                    .closest("li.menu")
                    .querySelectorAll(".nav-link");
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add("active");
                    });
                }
            }
        }
    }, [location]);

    const isRtl =
        useSelector((state: RootState) => state.themeConfig.rtlClass) === "rtl"
            ? true
            : false;

    const themeConfig = useSelector((state: RootState) => state.themeConfig);
    const dispatch = useDispatch();

    const [messages, setMessages] = useState([
        {
            id: 1,
            image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
            title: "Congratulations!",
            message: "Your OS has been updated.",
            time: "1hr",
        },
        {
            id: 2,
            image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg g xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
            title: "Did you know?",
            message: "You can switch between artboards.",
            time: "2hr",
        },
        {
            id: 3,
            image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
            title: "Something went wrong!",
            message: "Send Reposrt",
            time: "2days",
        },
        {
            id: 4,
            image: '<span className="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
            title: "Warning",
            message: "Your password strength is low.",
            time: "5days",
        },
    ]);

    const removeMessage = (value: number) => {
        setMessages(messages.filter((user) => user.id !== value));
    };

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            profile: "user-profile.jpeg",
            message:
                '<strong className="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
            time: "45 min ago",
        },
        {
            id: 2,
            profile: "profile-34.jpeg",
            message:
                '<strong className="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
            time: "9h Ago",
        },
        {
            id: 3,
            profile: "profile-16.jpeg",
            message:
                '<strong className="text-sm mr-1">Anna Morgan</strong>Upload a file',
            time: "9h Ago",
        },
    ]);

    const removeNotification = (value: number) => {
        setNotifications(notifications.filter((user) => user.id !== value));
    };

    return (
        <header
            className={`z-40 ${
                themeConfig.semidark && themeConfig.menu === "horizontal"
                    ? "dark"
                    : ""
            }`}
        >
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link
                            to="/"
                            className="main-logo flex items-center shrink-0"
                        >
                            <img
                                className="w-8 ltr:-ml-1 rtl:-mr-1 inline"
                                src="/assets/images/Gmobile.png"
                                alt="logo"
                            />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5  font-semibold  align-middle hidden md:inline dark:text-white-light transition-all duration-300">
                                Gmobile
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="ltr:mr-2 rtl:ml-2 hidden sm:block">
                        <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                            <li>
                                <Link
                                    to="/apps/calendar"
                                    className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                >
                                    <IconCalendar />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/apps/todolist"
                                    className="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                >
                                    <IconEdit />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
                        <div>
                            {themeConfig.theme === "light" ? (
                                <button
                                    className={`${
                                        themeConfig.theme === "light" &&
                                        "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme("dark"));
                                    }}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ""
                            )}
                            {themeConfig.theme === "dark" && (
                                <button
                                    className={`${
                                        themeConfig.theme === "dark" &&
                                        "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme("system"));
                                    }}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === "system" && (
                                <button
                                    className={`${
                                        themeConfig.theme === "system" &&
                                        "flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme("light"));
                                    }}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div>
                        <div className="dropdown shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${
                                    isRtl ? "bottom-start" : "bottom-end"
                                }`}
                                btnClassName="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                button={
                                    <span>
                                        <IconBellBing />
                                        <span className="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                            <span className="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                        </span>
                                    </span>
                                }
                            >
                                <ul className="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                    <li onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 className="text-lg">
                                                Notification
                                            </h4>
                                            {notifications.length ? (
                                                <span className="badge bg-primary/80">
                                                    {notifications.length}New
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </li>
                                    {notifications.length > 0 ? (
                                        <>
                                            {notifications.map(
                                                (notification) => {
                                                    return (
                                                        <li
                                                            key={
                                                                notification.id
                                                            }
                                                            className="dark:text-white-light/90"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                        >
                                                            <div className="group flex items-center px-4 py-2">
                                                                <div className="grid place-content-center rounded">
                                                                    <div className="w-12 h-12 relative">
                                                                        <img
                                                                            className="w-12 h-12 rounded-full object-cover"
                                                                            alt="profile"
                                                                            src={`/assets/images/${notification.profile}`}
                                                                        />
                                                                        <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                                                    </div>
                                                                </div>
                                                                <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                                    <div className="ltr:pr-3 rtl:pl-3">
                                                                        <h6
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: notification.message,
                                                                            }}
                                                                        ></h6>
                                                                        <span className="text-xs block font-normal dark:text-gray-500">
                                                                            {
                                                                                notification.time
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                                        onClick={() =>
                                                                            removeNotification(
                                                                                notification.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <IconXCircle />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                }
                                            )}
                                            <li>
                                                <div className="p-4">
                                                    <button className="btn btn-primary block w-full btn-small">
                                                        Read All Notifications
                                                    </button>
                                                </div>
                                            </li>
                                        </>
                                    ) : (
                                        <li
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                type="button"
                                                className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]"
                                            >
                                                <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                    <IconInfoCircle
                                                        fill={true}
                                                        className="w-10 h-10"
                                                    />
                                                </div>
                                                No data available.
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </Dropdown>
                        </div>
                        <div className="dropdown shrink-0 flex">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${
                                    isRtl ? "bottom-start" : "bottom-end"
                                }`}
                                btnClassName="relative group block"
                                button={
                                    <img
                                        className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                        src="/assets/images/user-profile.jpeg"
                                        alt="userProfile"
                                    />
                                }
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="rounded-md w-10 h-10 object-cover" src={auth?.profileUrl ?? '/assets/images/user-profile.jpeg'} alt="userProfile" />
                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">
                                                    {auth?.displayName}
                                                    <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                                                </h4>
                                            </div>
                                            {auth?.userName !== undefined ? (
                                                <button
                                                    type="button"
                                                    className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                >
                                                    Hi, {auth?.userName}
                                                </button>
                                            ) : null}
                                            {/* <button
                                                type="button"
                                                className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                            >
                                                Hi, {auth?.userName}
                                            </button> */}
                                        </div>
                                    </li>
                                    <li>
                                        <Link
                                            to="/"
                                            className="dark:hover:text-white"
                                        >
                                            <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Cá nhân
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <Link
                                            to="/"
                                            onClick={() => signout("/signin")}
                                            className="text-danger !py-3"
                                        >
                                            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
