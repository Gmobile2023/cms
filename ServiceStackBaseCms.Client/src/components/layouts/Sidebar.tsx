import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { toggleSidebar } from "../../store/slices/themeConfigSlice";
import AnimateHeight from "react-animate-height";
import { RootState } from "../../store/root";
import { useState, useEffect } from "react";
import IconCaretDown from "../Icon/IconCaretDown";
import IconMenuTodo from "../Icon/Menu/IconMenuTodo";
import IconMinus from "../Icon/IconMinus";
import IconCaretsDown from "../Icon/IconCaretsDown";
import IconMenuUsers from "../Icon/Menu/IconMenuUsers";
import IconSettings from "../Icon/IconSettings";
import IconNotesEdit from "../Icon/IconNotesEdit";
import { useAuth } from "@/useAuth";

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>("");
    const themeConfig = useSelector((state: RootState) => state.themeConfig);
    const semidark = useSelector(
        (state: RootState) => state.themeConfig.semidark
    );
    const location = useLocation();
    const dispatch = useDispatch();
    const { hasPermission, revalidate } = useAuth();

    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? "" : value;
        });
    };

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [location]);

    // Permissions
    const menuItems = [
        {
            label: "Người dùng",
            path: "/users-manager",
            permission: "",
            icon: <IconMenuUsers />,
        },
        {
            label: "Quản lý Trang",
            path: "/pages",
            permission: "",
            icon: <IconNotesEdit />,
        },
        // {
        //     label: "Quản lý roles",
        //     path: "/roles-manager",
        //     permission: "",
        //     icon: <IconNotesEdit />,
        // },
        // {
        //     label: "Quản lý permission",
        //     path: "/permission-manager",
        //     permission: "",
        //     icon: <IconNotesEdit />,
        // },
        {
            label: "Phân quyền",
            submenu: [
                { label: "Quản lý vai trò", path: "/roles-manager" },
                // { label: "Quản lý quyền", path: "/permission-manager" },
            ],
            permission: "",
            icon: <IconSettings />,
        },
        {
            label: "Hệ thống",
            submenu: [
                { label: "Cài đặt", path: "/system/setting" },
                { label: "Preview", path: "/system/preview" },
            ],
            permission: "",
            icon: <IconSettings />,
        },
    ];

    // Filter menu items based on permissions
    const filteredMenuItems = menuItems.filter((item) => {
        return !item.permission || hasPermission(item.permission);
    });

    return (
        <div className={semidark ? "dark" : ""}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${
                    semidark ? "text-white-dark" : ""
                }`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink
                            to="/"
                            className="main-logo flex items-center shrink-0"
                        >
                            <img
                                className="w-8 ml-[5px] flex-none"
                                src="/assets/images/Gmobile.png"
                                alt="logo"
                            />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">
                                Gmobile
                            </span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>Menu</span>
                            </h2>

                            {filteredMenuItems.map((item, index) => (
                                <li className="nav-item" key={index}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                type="button"
                                                className={`${
                                                    currentMenu === item.label
                                                        ? "active"
                                                        : ""
                                                } nav-link group w-full`}
                                                onClick={() =>
                                                    toggleMenu(item.label)
                                                }
                                            >
                                                <div className="flex items-center">
                                                    {item.icon}
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <div
                                                    className={
                                                        currentMenu !==
                                                        item.label
                                                            ? "rtl:rotate-90 -rotate-90"
                                                            : ""
                                                    }
                                                >
                                                    <IconCaretDown />
                                                </div>
                                            </button>
                                            <AnimateHeight
                                                duration={300}
                                                height={
                                                    currentMenu === item.label
                                                        ? "auto"
                                                        : 0
                                                }
                                            >
                                                <ul className="sub-menu text-gray-500">
                                                    {item.submenu.map(
                                                        (subItem, subIndex) => (
                                                            <li key={subIndex}>
                                                                <NavLink
                                                                    to={
                                                                        subItem.path
                                                                    }
                                                                >
                                                                    {
                                                                        subItem.label
                                                                    }
                                                                </NavLink>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </AnimateHeight>
                                        </>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            className="group"
                                        >
                                            <div className="flex items-center">
                                                {item.icon}
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                    {item.label}
                                                </span>
                                            </div>
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
