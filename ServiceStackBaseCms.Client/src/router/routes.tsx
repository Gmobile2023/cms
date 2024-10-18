import { lazy } from "react";
import SignupConfirm from "@/pages/authentication/signup-confirm";
import Dashboard from "@/pages/dashboard";
import UsersManager from "@/pages/users-manager";
import Roles from "@/pages/roles";
import Permission from "@/pages/permission";
import Signup from "@/pages/authentication/signup";
const Signin = lazy(() => import("../pages/authentication/signin"));
const Pages = lazy(() => import("../pages/pages"));

const routes = [
    {
        path: "/",
        // @ts-ignore
        element: <Dashboard />,
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
        element: <UsersManager />,
    },
    {
        path: "/roles-manager",
        element: <Roles />,
    },
    {
        path: "/permission-manager",
        element: <Permission />,
    },
    {
        path: "/pages",
        element: <Pages />,
    },
];

export { routes };
