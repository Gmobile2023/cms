import { RolesRequest } from "@/dtos";
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
