// src/utils/auth.js
import { authToken } from '../stores/auth';
import {jwtDecode} from "jwt-decode";
import {get} from "svelte/store";
import page from "page";

export const handleAuthResponse = async (response, code) => {
    const responseCode = response.status;
    const data = await response.json();

    if (responseCode !== code) {
        throw new Error(data.error);
    }

    const {token} = data;
    authToken.set(token);
    localStorage.setItem('token', token);

    page.redirect('/');
}

/**
 * Decodes the jwt token and check if the user is an admin
 * @returns {*|boolean} - true if the user is an admin, false otherwise
 */
export const isUserAdmin = () => {
    const token = get(authToken) || localStorage.getItem('token');
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin;
};

export const handleAuthError = (error) => {
    if (error.status === 401 || error.status === 403) {
        // Clear the token and redirect to login page
        authToken.set(null);
        localStorage.removeItem('token');
        page.redirect('/login');
    }
};

/**
 * Checks if the user is logged in
 * @returns {boolean} - true if the user is logged in, false otherwise
 */
export const isUserLoggedIn = () => {
    const token = get(authToken) || localStorage.getItem('token');

    if(!token){
        return false;
    } else {
        return true
    }
}

