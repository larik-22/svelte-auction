import validator from "validator";
import bcrypt from "bcrypt";

export class User {
    static #idCounter = 0;

    #id;
    email;
    password;
    isAdmin;

    constructor(email, password, isAdmin = false) {
        this.#id = ++User.#idCounter;

        validateUserEmail(email);
        this.email = email;

        validateUserPassword(password);
        this.password = bcrypt.hashSync(password, 10);

        this.isAdmin = isAdmin;
    }

    get id() {
        return this.#id;
    }
}

export function validateUserEmail(email) {
    if (!email || !validator.isEmail(email)) {
        throw new Error('Invalid email: must be a valid email.');
    }
}

export function validateUserPassword(password) {
    if (!password || typeof password !== 'string') {
        throw new Error('Invalid password: must be a string.');
    }

    // check if it has at least 8 characters
    if (password.length < 8) {
        throw new Error('Invalid password: must be at least 8 characters long.');
    }

    // check if it has at least one number
    if (!/\d/.test(password)) {
        throw new Error('Invalid password: must contain at least one number.');
    }

    // check if it has at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        throw new Error('Invalid password: must contain at least one uppercase letter.');
    }

    //too much?
    // // check if it has at least one symbol
    // if (!/[!@#$%^&*]/.test(password)) {
    //     throw new Error('Invalid password: must contain at least one symbol.');
    // }
}

/**
 * Check if the password is correct
 * @param password password to check
 * @param hashedPassword hashed password to compare with
 * @returns {boolean} true if the password is correct, false otherwise
 */
export function checkUserPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}