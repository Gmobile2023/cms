import {
    CreateRoleClaim,
    CreateRolesRequest,
    PermissionsRequest,
    RoleClaimsRequest,
    RoleRequest,
    RolesRequest,
    UpdateRoleClaim,
    UpdateRolesRequest,
} from "@/dtos";
import { client } from "@/gateway";

export const getRoles = async () => {
    try {
        const apiResponse = await client.api<any>(new RolesRequest());

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to get roles",
            };
        }
    } catch (err) {
        console.error("Error get roles:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};

export const getDetailRole = async (id: string) => {
    try {
        const apiResponse = await client.api<any>(new RoleRequest({ id }));

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to get role",
            };
        }
    } catch (err) {
        console.error("Error get role:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};

export const getClaims = async () => {
    try {
        const apiResponse = await client.api<any>(new PermissionsRequest());

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to get role claims",
            };
        }
    } catch (err) {
        console.error("Error get role claims:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};

export const CreateRole = async (data: any) => {
    try {
        const apiResponse = await client.api(new CreateRolesRequest(data));

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to create role",
            };
        }
    } catch (err) {
        console.error("Error create role:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};

export const UpdateRole = async (data: any) => {
    try {
        const apiResponse = await client.api(new UpdateRolesRequest(data));

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to update role",
            };
        }
    } catch (err) {
        console.error("Error update role:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};
