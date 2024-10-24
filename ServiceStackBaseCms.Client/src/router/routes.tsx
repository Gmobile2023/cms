import { lazy } from "react";
import SignupConfirm from "@/pages/authentication/signup-confirm";
import Dashboard from "@/pages/dashboard";
import Signup from "@/pages/authentication/signup";

const Forbidden = lazy(() => import("../pages/forbidden"));
const Signin = lazy(() => import("../pages/authentication/signin"));
const Pages = lazy(() => import("../pages/pages"));
const NewPage = lazy(() => import("../pages/pages/add"));
const EditPage = lazy(() => import("../pages/pages/edit"));
const Roles = lazy(() => import("@/pages/roles"));
const UsersManager = lazy(() => import("@/pages/users-manager"));
// const Signup = lazy(() => import("@/pages/authentication/signup"));
const SettingPage = lazy(() => import("@/pages/setting"));

const routes = [
    {
        path: "/",
        // @ts-ignore
        element: <Dashboard />,
    },
    {
        path: "/forbidden",
        element: <Forbidden />,
        layout: "blank",
    },
    {
        path: "/signin",
        element: <Signin />,
        layout: "blank",
    },
    {
        path: "/signup",
        element: <Signup />,
        layout: "blank",
    },
    {
        path: "/signup-confirm",
        element: <SignupConfirm />,
        layout: "blank",
    },

    {
        path: "/dashboard",
        // @ts-ignore
        element: <Dashboard />,
    },
    {
        path: "/users-manager",
        // @ts-ignore
        element: <UsersManager />,
    },
    {
        path: "/managers/roles-manager",
        // @ts-ignore
        element: <Roles />,
    },
    {
        path: "/system/setting",
        // @ts-ignore
        element: <SettingPage />,
    },
    // {
    //     path: "/permission-manager",
    //     element: <Permission />,
    // },
    {
        path: "/pages",
        // @ts-ignore
        element: <Pages />,
    },
    {
        path: "/pages/new",
        // @ts-ignore
        element: <NewPage />,
    },
    {
        path: "/pages/edit",
        // @ts-ignore
        element: <EditPage />,
    },
];

export { routes };
