import {BASE_BACKEND_URL} from "../config.js";
import {handleAuthError} from "./auth.js";
import {isBlank} from "./utils.js";

export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token') || '';

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

    return await response.json();
};
/**
 * Extracts id parameter from the URL
 * @param resource - the resource to post the entry to
 * @param filters - object of filters to apply to the request
 * @returns {Promise<any>} - the response from the server
 */
export const getApiData = async (resource, filters = {}) => {
    try {
        // Convert the filters object into a query string (Account for comma separated values)
        const queryParams = formatQueryParams(filters);

        return await fetchWithAuth(`${BASE_BACKEND_URL}/${resource}` + (queryParams ? `?${queryParams}` : ''));
    } catch (error) {
        console.error(error.message);
        throw new Error(`Error when fetching ${resource}: ${error}`);
    }
}

/**
 * Creates a valid query string from the filters object
 * @param filters - object of filters to apply to the request
 * @returns {string} - the query string
 */
export const formatQueryParams = (filters) => {
    //loop through the keys and if the value is not empty, add it to the query string
    return Object.keys(filters)
        .filter(key => filters[key] && filters[key].trim() !== "")
        .map(key => filters[key]
            .split(',')
            .map(value => `${key}=${value}`)
            .join('&'))
        .join('&');
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