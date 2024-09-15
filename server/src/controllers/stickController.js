import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {Stick, validateDynamicProperties, validateStaticStickProperties, validateStickDate} from "../model/Stick.js";

const findStick = (id) => data.sticks.find(stick => stick.id === id);

export const getAllSticks = (req, res) => {
    // gets sticks, but also sends an id for each stick to use in the frontend;
    res.json(utils.getItemsWithId(data.sticks));
}

export const getStickById = (req, res) => {
    const id = parseInt(req.params.id);
    const stick = findStick(req.params.id);

    if (stick) {
        res.json(stick);
    } else {
        res.status(404).send(`Stick with id ${id} was not found.`);
    }
}

export const createStick = (req, res) => {
    const {name, description, image, estimatedPrice, length, feature, typeOfTree, weight, endDate} = req.body;

    try {
        const stick = new Stick(data.sticks.length + 1, name, description, image, estimatedPrice, length, feature, typeOfTree, weight, endDate);
        data.sticks.push(stick);

        res.status(201).json({message: `New stick with id ${data.sticks.length} created successfully`, stick});
    } catch (error) {
        res.status(400).json({error: `${error.message}`});
    }
}

export const updateStick = (req, res) => {
    const id = parseInt(req.params.id);
    const stick = findStick(id);

    if (stick) {
        const {name, description, image, estimatedPrice, length, feature, typeOfTree, weight, endDate} = req.body;

        // validate properties first
        try {
            validateStickOnUpdate(stick, req.body);
        } catch (error) {
            res.status(400).json({error: `${error.message}`});
            return;
        }

        // set properties if they are not undefined
        stick.name = name || stick.name;
        stick.description = description || stick.description;
        stick.image = image || stick.image;
        stick.estimatedPrice = estimatedPrice || stick.estimatedPrice;
        stick.length = length || stick.length;
        stick.feature = feature || stick.feature;
        stick.typeOfTree = typeOfTree || stick.typeOfTree;
        stick.weight = weight || stick.weight;
        stick.endDate = endDate || stick.endDate;

        res.status(200).json({message: `Stick with id ${id} updated successfully`, stick});
    } else {
        res.status(404).send(`Stick with id ${id} was not found.`);
    }
}

export const deleteStick = (req, res) => {
    const id = parseInt(req.params.id);
    const stick = findStick(id);

    if (stick) {
        data.sticks = data.sticks.filter(stick => stick.id !== parseInt(req.params.id));
        res.status(200).json({message: `Stick with id ${req.params.id} deleted successfully`});
    } else {
        res.status(404).send(`Stick with id ${id} was not found.`);
    }
}

/**
 * Validates stick properties on update
 * @param oldStick original stick
 * @param newStick new stick object formed of passed body parameters
 */
const validateStickOnUpdate = (oldStick, newStick) => {
    const {name, description, estimatedPrice, length, feature, typeOfTree, weight, endDate} = newStick;

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
    if (endDate !== undefined) validateStickDate(endDate);
}
