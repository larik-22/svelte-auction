import {BASE_BACKEND_URL} from "../config.js";
import {handleAuthError} from "./auth.js";

/**
 * Makes a protected fetch call
 * @param url - the URL to
 * @param options - the options to pass to the fetch call
 */
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
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Failed to fetch');
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

