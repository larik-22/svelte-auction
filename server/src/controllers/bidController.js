import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {jwtDecode} from "jwt-decode";
import {Bid} from "../model/Bid.js";
import {emitter} from "../index.js";

export const createBid = (req, res) => {
    /*
    * 1. Decode the token from the request
    * 2. Get the user id from the decoded token
    * 3. Get the stick id from the request body
    * 4. Get the amount from the request body
    * 5. Create a new bid with the user id, stick id, and amount
    * */
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

