import { CreateUserRequest, UpdateUserRequest, UsersRequest } from "@/dtos";
import { client } from "@/gateway";

export const fetchAllUser = async () => {
    try {
        const apiResponse = await client.api(new UsersRequest());

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse?.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to get users",
            };
        }
    } catch (err) {
        console.error("Error get users:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};

export const CreateUser = async (data: any) => {
    try {
        const apiResponse = await client.api(new CreateUserRequest(data));

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to create user",
            };
        }
    } catch (err) {
        console.error("Error create user:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};

export const UpdateUser = async (data: any) => {
    try {
        const apiResponse = await client.api(new UpdateUserRequest(data));

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || "Failed to update user",
            };
        }
    } catch (err) {
        console.error("Error update user:", err);
        return {
            success: false,
            error: (err as Error).message || "An unknown error occurred",
        };
    }
};
