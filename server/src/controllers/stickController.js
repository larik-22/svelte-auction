import {data} from "../data/data.js";
import * as utils from "../utils/utils.js";
import {Stick, validateDynamicProperties, validateStaticStickProperties, validateStickDate} from "../model/Stick.js";
import Fuse from 'fuse.js';

export const getAllSticks = (req, res) => {
    if(data.sticks.length === 0){
        res.status(200).json(data.sticks)
        return;
    }
    const filters = req.query;
    const filteredSticks = filterSticks(data.sticks, filters);

    res.status(200).json(utils.getItemsWithId(filteredSticks));
}

const filterSticks = (sticks, filters) => {
    let filteredSticks = [...sticks];

    if (filters.name) {
        const fuse = new Fuse(filteredSticks, {
            keys: ['name'],
            threshold: 0.3
        });

        const result = fuse.search(filters.name);
        filteredSticks = result.map(({ item }) => item);
    }

    if (filters.feature) {
        filteredSticks = filterByProperty(filteredSticks, filters, "feature");
    }

    if (filters.length){
        filteredSticks = filterByProperty(filteredSticks, filters, "length");
    }

    if (filters.weight){
        filteredSticks = filterByProperty(filteredSticks, filters, "weight");
    }

    if (filters.typeOfTree) {
        filteredSticks = filterByProperty(filteredSticks, filters, "typeOfTree");
    }

    // add sorting (name, price) with order (asc, desc)
    if (filters.sortBy) {
        const sortType = filters.sortBy;
        const sortOrder = filters.sortOrder === 'desc' ? -1 : 1; // default to ascending order

        if (sortType === "name") {
            filteredSticks.sort((a, b) => sortOrder * a.name.localeCompare(b.name));
        } else if (sortType === "price") {
            filteredSticks.sort((a, b) => sortOrder * (a.startingPrice - b.startingPrice));
        }
    }


    return filteredSticks;
}

/**
 * Filters array by given property out of query parameter.
 * Since it could be either string or array, it checks for both cases.
 * @param items array of items to be filtered
 * @param filters query parameters
 * @param property property to filter by
 * @returns {*}
 */
const filterByProperty = (items, filters, property) => {
    return items.filter(item => {
        const filterValue = filters[property];

        if (Array.isArray(filterValue)) {
            return filterValue.find(value =>
                item[property]?.toLowerCase().includes(value.toLowerCase())
            );
        } else if (typeof filterValue === 'string') {
            return item[property]?.toLowerCase().includes(filterValue.toLowerCase());
        }

        return true;
    });
}

export const getStickById = (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const stick = utils.findItemById("sticks", id);
        delete stick.validateFutureDates
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
    const {name, description, image, startingPrice, length, feature, weight, startDate, endDate} = req.body;

    try {
        // name, description, image, startingPrice, length, feature, weight, startDate, endDate
        const stick = new Stick(name, description, image, startingPrice, length, feature, weight, startDate, endDate);
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
        const {name, description, image, startingPrice, length, feature, weight, startDate, endDate} = req.body;
        const properties = {name, description, image, startingPrice, length, feature, weight, startDate, endDate};

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
    const {name, description, startingPrice, length, feature, weight, startDate, endDate} = newStick;

    // Validate static properties if they are present
    if (name !== undefined) validateStaticStickProperties(name, oldStick.description, oldStick.startingPrice);
    if (description !== undefined) validateStaticStickProperties(oldStick.name, description, oldStick.startingPrice);
    if (startingPrice !== undefined) validateStaticStickProperties(oldStick.name, oldStick.description, startingPrice);

    // Validate dynamic properties if they are present
    if (length !== undefined) validateDynamicProperties(length, oldStick.feature, oldStick.weight);
    if (feature !== undefined) validateDynamicProperties(oldStick.length, feature, oldStick.weight);
    if (weight !== undefined) validateDynamicProperties(oldStick.length, oldStick.feature, weight);

    // Validate endDate and startDate if it is present
    if (startDate !== undefined && endDate !== undefined) {
        validateStickDate(startDate, endDate);
    } else if (startDate !== undefined) {
        validateStickDate(startDate, oldStick.endDate);
    } else if (endDate !== undefined) {
        validateStickDate(oldStick.startDate, endDate);
    }
}
