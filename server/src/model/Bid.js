import {data} from "../data/data.js";
import {findItemById} from "../utils/utils.js";

export class Bid {
    static #idCounter = 0

    #id;
    userId;
    stickId;
    amount;

    constructor(userId, stickId, amount, skipStickValidation = false) {
        this.#id = Bid.#idCounter++;

        validateUser(userId);
        this.userId = userId;

        if (!skipStickValidation) {
            validateStick(stickId);
        }
        this.stickId = stickId;

        validateAmount(amount, stickId, userId);
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

export const validateAmount = (amount, stickId, userId) => {
    if (amount < 0) {
        throw new Error(`Amount must be a positive number`);
    }

    const stick = findItemById("sticks", stickId);

    // Get the highest bid amount or the estimated price if there are no bids
    const highestBid = Math.max(...stick.bids.map(bid => bid.amount), stick.estimatedPrice);

    // Find the user who made the highest bid
    // (Thanks AI for this unreadable code. I am gonna be replaced by it soon)
    const highestBidUser = stick.bids.reduce((maxBid, bid) => {
        return bid.amount > maxBid.amount ? bid : maxBid;
    }, { amount: -Infinity }).userId;

    if (highestBidUser === userId) {
        throw new Error(`You can't bid on your own stick`);
    }

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