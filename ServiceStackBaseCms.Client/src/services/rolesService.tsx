import { RoleClaimsRequest, RolesRequest } from "@/dtos";
import { client } from "@/gateway";

export const getRoles = async () => {
    try {
        const apiResponse = await client.api(new RolesRequest());

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

export const getRoleClaims = async () => {
    try {
        const apiResponse = await client.api(new RoleClaimsRequest());

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
