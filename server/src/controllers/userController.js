import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {User} from "../model/User.js";

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

export const createUser = (req, res) => {
    const {email, password} = req.body;

    try {
        const user = new User(email, password);
        data.users.push(user);

        res.status(201).json({message: `New user with id ${user.id} created successfully`});
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