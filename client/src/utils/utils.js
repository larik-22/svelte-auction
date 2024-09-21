import {BASE_BACKEND_URL} from "../config.js";

//TODO: implement the rest of the functions
export const deleteData = async (data, resource, id) => {
    await deleteApiData(resource, id);
    data = data.filter(item => item.id !== id);
}