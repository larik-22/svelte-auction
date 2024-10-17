import page from "page";
import {authToken} from "../stores/auth.js";
import {get} from "svelte/store";

export const isLoggedIn = (ctx, next) => {
    const token = get(authToken) || localStorage.getItem('token');
    if (!token) {
        page.redirect('/login');
    } else {
        next();
    }
}
