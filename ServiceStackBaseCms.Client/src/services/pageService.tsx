import { CreatePage, Page } from "@/dtos";
import { client } from "@/gateway";

export const createNewPage = async (data: Page) => {
    try {
        const apiResponse = await client.api(new CreatePage(data));

        if (apiResponse.succeeded && apiResponse.response) {
            return {
                success: true,
                response: apiResponse.response,
            };
        } else {
            return {
                success: false,
                error: apiResponse.error || 'Failed to create page',
            };
        }
    } catch (err) {
        console.error('Error creating page:', err);
        return {
            success: false,
            error: (err as Error).message || 'An unknown error occurred',
        };
    }
};