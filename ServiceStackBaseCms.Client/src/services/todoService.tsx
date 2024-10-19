// import { client } from "@/gateway";
// import { CreateTodo, Todo } from "@/dtos";

// export const createTodo = async (data: Todo) => {
//     try {
//         const apiResponse = await client.api(new CreateTodo(data));

//         if (apiResponse.succeeded && apiResponse.response) {
//             return {
//                 success: true,
//                 response: apiResponse.response,
//             };
//         } else {
//             return {
//                 success: false,
//                 error: apiResponse.error || 'Failed to create todo',
//             };
//         }
//     } catch (err) {
//         console.error('Error creating todo:', err);
//         return {
//             success: false,
//             error: (err as Error).message || 'An unknown error occurred',
//         };
//     }
// };
