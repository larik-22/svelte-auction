import {BASE_BACKEND_URL} from "../config.js";
import {deleteApiData} from "./api.js";
import validator from "validator/es";

/**
 * Check if a string is blank.
 * Used regular expression to check if a string is blank.
 * @param str - The string to check.
 * @returns {boolean|boolean} - True if the string is blank, false otherwise.
 */
export const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
}

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//TODO: implement the rest of the functions
export const deleteData = async (data, resource, id) => {
    await deleteApiData(resource, id);
    data = data.filter(item => item.id !== id);
}

export const validateEmail = (email) => {
    if(email == null || isBlank(email)) {
        return "Email cannot be empty";
    }

    if(!validator.isEmail(email)) {
        return "Email is not valid";
    }
}

export const validatePassword = (password) => {
    if(password == null || isBlank(password)) {
        return "Password cannot be empty";
    }

    if(password.length < 8) {
        return "Password must have at least 8 characters";
    }

    if(!/[A-Z]/.test(password)) {
        return "Password must have at least one uppercase letter";
    }

    if(!/[0-9]/.test(password)) {
        return "Password must have at least one number";
    }
}