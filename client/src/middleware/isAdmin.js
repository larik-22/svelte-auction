import {isUserAdmin} from "../utils/auth.js";
import page from "page";

export const isAdmin = (ctx, next) => {
    if(isUserAdmin()){
        next();
    } else {
        page.redirect('/');
    }
};