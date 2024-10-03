import {authToken} from "../stores/auth.js";
import {get} from "svelte/store";
import {isUserAdmin} from "../utils/auth.js";
import page from "page";

export const isNotAdmin = (ctx, next) => {
    if(!isUserAdmin()){
        next();
    } else {
        page.redirect('/');
    }
};