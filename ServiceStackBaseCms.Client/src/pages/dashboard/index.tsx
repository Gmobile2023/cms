// import { useAuth } from "@/useAuth";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { ValidateAuth } from "@/useAuth";

const Dashboard = () => {
    // const navigate = useNavigate();
    // const { auth } = useAuth();
    // useEffect(() => {
    //     if (auth?.userName == undefined) {
    //         navigate("/signin");
    //     }
    // }, []);
    return (
        <div className="panel">
            <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">
                    Dashboard
                </h5>
            </div>
        </div>
    );
};

export default ValidateAuth(Dashboard);
