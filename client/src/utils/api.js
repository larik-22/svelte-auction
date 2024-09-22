import {BASE_BACKEND_URL} from "../config.js";
import {handleAuthError} from "./auth.js";

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
        ...options,
        headers: headers
    });

    if (!response.ok) {
        handleAuthError(response);
        throw new Error('Failed to fetch');
    }

    return response.json();
};

/**
 * Extracts id parameter from the URL
 * @param resource - the resource to post the entry to
 * @param filters - object of filters to apply to the request
 * @returns {Promise<any>} - the response from the server
 */
export const getApiData = async (resource, filters = {}) => {
    try {
        const queryParams = Object.keys(filters).map(key => `${key}=${filters[key]}`).join('&');
        const response = await fetch(`${BASE_BACKEND_URL}/${resource}` + (queryParams ? `?${queryParams}` : ''));
        return await response.json();
    } catch (error) {
        throw new Error(`Error when fetching ${resource}: ${error}`);
    }
}

/**
 * Deletes an entry from the API
 * @param resource - the resource to delete the entry from
 * @param id - the id of the entry to delete
 * @returns {Promise<Response>}
 */
export const deleteApiData = async (resource, id) => {
    const response = await fetchWithAuth(`${BASE_BACKEND_URL}/${resource}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`Error when deleting ${resource}: ${response.status}`);
    }

    return response;
}