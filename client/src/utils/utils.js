import {BASE_BACKEND_URL} from "../config.js";

/**
 * Extracts id parameter from the URL
 * @param resource - the resource to post the entry to
 * @returns {Promise<any>} - the response from the server
 */
export const getApiData = async (resource) =>{
    const response = await fetch(`${BASE_BACKEND_URL}/${resource}`);
    if (!response.ok) {
        throw new Error(`Error when fetching ${resource}: ${response.status}`);
    }

    return await response.json();
}

export const deleteApiData = async (resource, id) => {
    const response = await fetch(`${BASE_BACKEND_URL}/${resource}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error when deleting ${resource}: ${response.status}`);
    }

    return response;
}

//TODO: implement the rest of the functions
export const deleteData = async (data, resource, id) => {
    await deleteApiData(resource, id);
    data = data.filter(item => item.id !== id);
}