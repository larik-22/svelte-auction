// src/utils/auth.js
import { authToken } from '../stores/auth';
import {jwtDecode} from "jwt-decode";
import {get} from "svelte/store";
import page from "page";

/**
 * Handles the registration response by setting the token
 * @param response - the response from the server
 */
export const handleRegistrationResponse = async (response) => {
    //get response code
    const responseCode = response.status;
    const data = await response.json();

    if(responseCode !== 201){
        throw new Error(data.error);
    }

    const { token } = data;
    authToken.set(token);
    localStorage.setItem('token', token);

    page.redirect('/');
};

/**
 * Handles the login response by setting the token
 * in the local storage and updating the authToken store
 * @param response - the response from the server
 */
export const handleLoginResponse = async (response) => {
    const responseCode = response.status;
    const data = await response.json();

    if(responseCode !== 200){
        throw new Error(data.error);
    }

    const { token } = data;
    authToken.set(token);
    localStorage.setItem('token', token);

    page.redirect('/');
};

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

