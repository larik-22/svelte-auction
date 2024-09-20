import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";

export const getAllBids = (req, res) => {

}

export const getBidById = (req, res) => {
    const id = parseInt(req.params.id);
}

export const createBid = (req, res) => {

}

export const updateBid = (req, res) => {
    const id = parseInt(req.params.id);

}

export const deleteBid = (req, res) => {
    const id = parseInt(req.params.id);
    const bid = utils.findItemById("bids", id);

    if (bid) {
        data.bid = data.bid.filter(stick => stick.id !== parseInt(req.params.id));
        res.status(200).json({message: `Bid with id ${req.params.id} deleted successfully`});
    } else {
        res.status(404).send(`Bid with id ${id} was not found.`);
    }
}
