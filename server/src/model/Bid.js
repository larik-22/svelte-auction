import {data} from "../data/data.js";
import {findItemById} from "../utils/utils.js";

export class Bid {
    static #idCounter = 0

    #id;
    userId;
    stickId;
    amount;

    constructor(userId, stickId, amount) {
        this.#id = Bid.#idCounter++;

        validateUser(userId);
        this.userId = userId;

        validateStick(stickId);
        this.stickId = stickId;

        validateAmount(amount, stickId);
        this.amount = amount;

        addBidToStick(this, stickId);
    }

    get id() {
        return this.#id;
    }
}

export const validateStick = (stickId) => {
    const stick = findItemById("sticks", stickId);
    if (!stick) {
        throw new Error(`Stick with id ${stickId} not found`);
    }

    if (stick.startDate > new Date()) {
        throw new Error(`Stick auction hasn't started yet`);
    }

    if (stick.endDate < new Date()) {
        throw new Error(`Stick auction ended`);
    }
}

export const validateUser = (userId) => {
    const user = findItemById("users", userId);
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    if (user.isAdmin) {
        throw new Error(`Admins are not allowed to bid`);
    }
}

export const validateAmount = (amount, stickId) => {
    if (amount < 0) {
        throw new Error(`Amount must be a positive number`);
    }

    // TODO: make sure the amount is higher than the current highest
    //  bid AND higher than the starting price of the stick
    const stick = findItemById("sticks", stickId);

    // Get the highest bid amount or the estimated price if there are no bids
    const highestBid = Math.max(...stick.bids.map(bid => bid.amount), stick.estimatedPrice);

    if (amount <= highestBid) {
        throw new Error(`${amount} is not higher than the current highest bid of ${highestBid}`);
    }
}

const addBidToStick = (bid, stickId) => {
    if (!(bid instanceof Bid)) {
        throw new Error("Provided bid is not of class Bid");
    }

    const stick = findItemById("sticks", stickId);
    if (!stick) {
        throw new Error(`Stick with id ${stickId} not found`);
    }

    stick.bids.push(bid);
    data.bids.push(bid);
}