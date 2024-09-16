import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {Stick, validateDynamicProperties, validateStaticStickProperties, validateStickDate} from "../model/Stick.js";

const findBid = (id) => data.bids.find(stick => stick.id === id);

export const getAllBids = (req, res) => {
    // gets bids, but also sends an id for each stick to use in the frontend;
    res.json(data.bids);
}

export const getBidById = (req, res) => {
    const id = parseInt(req.params.id);
    const bid = findBid(req.params.id);

    if (bid) {
        res.json(bid);
    } else {
        res.status(404).send(`Bid with id ${id} was not found.`);
    }
}

export const createBid = (req, res) => {
    // const {name, description, image, estimatedPrice, length, feature, typeOfTree, weight, endDate} = req.body;

    // try {
    //     // const stick = new Stick(data.sticks.length + 1, name, description, image, estimatedPrice, length, feature, typeOfTree, weight, endDate);
    //     // data.sticks.push(stick);
    //
    //     res.status(201).json({message: `New bid with id ${data.sticks.length} created successfully`, //bid});
    // } catch (error) {
    //     res.status(400).json({error: `${error.message}`});
    // }
}

export const updateBid = (req, res) => {
    const id = parseInt(req.params.id);
    const bid = findBid(id);

}

export const deleteBid = (req, res) => {
    const id = parseInt(req.params.id);
    const bid = findBid(id);

    if (bid) {
        data.bid = data.bid.filter(stick => stick.id !== parseInt(req.params.id));
        res.status(200).json({message: `Bid with id ${req.params.id} deleted successfully`});
    } else {
        res.status(404).send(`Bid with id ${id} was not found.`);
    }
}
