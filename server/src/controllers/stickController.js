import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {Stick, validateDynamicProperties, validateStaticStickProperties, validateStickDate} from "../model/Stick.js";

export const getAllSticks = (req, res) => {
    if(data.sticks.length === 0){
        res.status(200).json(data.sticks)
        return;
    }

    // //pagination
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 3
    // const skip = (page - 1) * limit;
    //
    // try {
    //     const sticks = data.sticks.slice(skip, skip + limit);
    //     res.status(200).json(utils.getItemsWithId(sticks));
    // } catch (error) {
    //     res.status(404).json({error: `${error.message}`});
    // }

    //account for query parameters, loop through the query parameters and filter the sticks
    //if the query parameter is not found, return all sticks

    res.status(200).json(utils.getItemsWithId(data.sticks));
}

export const getStickById = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const stick = utils.findItemById("sticks", id);
        res.json(utils.getItemsWithId([stick])[0]);
    } catch (error) {
        res.status(404).json({error: `${error.message}`});
    }
}

export function getStickBids(req, res) {
    const id = parseInt(req.params.id);

    try {
        const stick = utils.findItemById("sticks", id);
        res.status(200).json(utils.getItemsWithId(stick.bids));
    } catch (error) {
        res.status(404).json({error: `${error.message}`});
    }
}
//201 returned
export const createStick = (req, res) => {
    const {name, description, image, estimatedPrice, length, feature, typeOfTree, weight, startDate, endDate} = req.body;

    try {
        const stick = new Stick(name, description, image, estimatedPrice, length, feature, typeOfTree, weight, startDate, endDate);
        data.sticks.push(stick);

        res.status(201).json({message: `New stick with id ${stick.id} created successfully`, stick});
    } catch (error) {
        res.status(400).json({error: `${error.message}`});
    }
}

export const updateStick = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const stick = utils.findItemById("sticks", id);
        const {name, description, image, estimatedPrice, length, feature, typeOfTree, weight, startDate, endDate} = req.body;
        const properties = {name, description, image, estimatedPrice, length, feature, typeOfTree, weight, startDate, endDate};

        // validate properties first
        try {
            validateStickOnUpdate(stick, req.body);
        } catch (error) {
            res.status(400).json({error: `${error.message}`});
            return;
        }

        // set properties if they are not undefined
        for (const [key, value] of Object.entries(properties)) {
            if (value !== undefined) {
                stick[key] = value;
            }
        }

        res.status(200).json({message: `Stick with id ${stick.id} updated successfully`, stick});
    } catch (error) {
        res.status(404).json({error: `${error.message}`});
    }

}

export const deleteStick = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const stick = utils.findItemById("sticks", id);
        data.sticks = data.sticks.filter(item => item.id !== stick.id);

        res.status(200).json({message: `Stick with id ${id} deleted successfully`});
    } catch (error) {
        res.status(404).json({error: `${error.message}`});
    }
}

/**
 * Validates stick properties on update
 * @param oldStick original stick
 * @param newStick new stick object formed of passed body parameters
 */
const validateStickOnUpdate = (oldStick, newStick) => {
    const {name, description, estimatedPrice, length, feature, typeOfTree, weight, startDate, endDate} = newStick;

    // Validate static properties if they are present
    if (name !== undefined) validateStaticStickProperties(name, oldStick.description, oldStick.estimatedPrice);
    if (description !== undefined) validateStaticStickProperties(oldStick.name, description, oldStick.estimatedPrice);
    if (estimatedPrice !== undefined) validateStaticStickProperties(oldStick.name, oldStick.description, estimatedPrice);

    // Validate dynamic properties if they are present
    if (length !== undefined) validateDynamicProperties(length, oldStick.feature, oldStick.typeOfTree, oldStick.weight);
    if (feature !== undefined) validateDynamicProperties(oldStick.length, feature, oldStick.typeOfTree, oldStick.weight);
    if (typeOfTree !== undefined) validateDynamicProperties(oldStick.length, oldStick.feature, typeOfTree, oldStick.weight);
    if (weight !== undefined) validateDynamicProperties(oldStick.length, oldStick.feature, oldStick.typeOfTree, weight);

    // Validate endDate if it is present
    if (startDate !== undefined) validateStickDate(startDate, oldStick.endDate);
    if (endDate !== undefined) validateStickDate(oldStick.startDate, endDate);
}
