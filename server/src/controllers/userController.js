import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {User} from "../model/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {generateToken} from "../utils/jwt.js";

dotenv.config();

/**
 * Returns array of users with email, id and isAdmin properties.
 * @param users - The array of users.
 */
const getFormattedUsers = (users) => {
    users = utils.getItemsWithId(users);

    return users.map(user => {
        return {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        }
    })
}

/**
 * Finds user by given email.
 * @param email - The email of the user.
 */
export const getUserByEmail = (email) => {
    return data.users.find(user => user.email === email);
}

export const getAllUsers = (req, res) => {
    if(data.users.length === 0){
        res.status(200).json(data.users)
        return;
    }

    res.status(200).json(getFormattedUsers(data.users));
}

export const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = utils.findItemById("users", id);
        res.json(utils.getItemsWithId([user])[0]);
    } catch (error) {
        res.status(404).json({error: `${error.message}`});
    }
}

export function getUserBids(req, res) {
    const id = parseInt(req.params.id);

    try {
        const user = utils.findItemById("users", id);
        const userBids = data.bids.filter(bid => bid.userId === user.id);
        res.json(utils.getItemsWithId(userBids));
    } catch (error) {
        res.status(404).json({error: `${error.message}`});
    }
}

export const createUser = (req, res) => {
    const {email, password} = req.body;
    // check if user with email already exists
    if(getUserByEmail(email)){
        res.status(409).json({error: `User with email ${email} already exists`});
        return;
    }

    try {
        const user = new User(email, password);
        data.users.push(user);

        const token = generateToken(user);
        res.status(201).json({message: `New user with id ${user.id} created successfully`, token});
    } catch (error) {
        res.status(400).json({error: `${error.message}`});
    }
}

export const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = utils.findItemById("users", id);
        data.users = data.users.filter(item => item.id !== user.id);

        res.status(200).json({message: `User with id ${id} deleted successfully`});
    } catch (error) {
        res.status(404).json({error: `${error.message}`});
    }
}