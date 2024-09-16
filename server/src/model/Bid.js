import {data} from "../data/data.js";
import {findItemById} from "../utils/utils.js";

export class Bid {
    #id;
    userId;
    stickId;
    amount;

    constructor(userId, stickId, amount) {
        this.id = data.bids.length + 1;
        this.userId = userId;
        this.stickId = stickId;
        this.amount = amount;
    }
}

export const validateStickId = (stickId) => {
    const stick = data.sticks.find(stick => stick.id === stickId);
    if (!stick) {
        throw new Error(`Stick with id ${stickId} not found`);
    }
}

export const validateUserId = (userId) => {
    const user = data.users.find(user => user.id === userId);
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }
}

export const validateAmount = (amount) => {
    if (amount < 0) {
        throw new Error(`Amount must be a positive number`);
    }

    // TODO: make sure the amount is higher than the current highest
    //  bid AND higher than the starting price
    const bid = findItemById("bids", this.id)
}