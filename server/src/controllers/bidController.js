import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {jwtDecode} from "jwt-decode";
import {Bid} from "../model/Bid.js";
import {emitter} from "../index.js";

export const createBid = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwtDecode(token);

    const userId = decodedToken.id;
    const {stickId, amount} = req.body;

    try {
        const newBid = new Bid(userId, stickId, amount);

        emitter.emit('new-bid', newBid);

        return res.status(201).json({
            message: "Bid created successfully.",
            bid: newBid
        });
    } catch (error){
        return res.status(400).json({
            error: error.message
        });
    }
}

