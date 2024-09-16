import {data} from "../data/data.js";

/**
 * Check if a string is blank.
 * Used regular expression to check if a string is blank.
 * @param str - The string to check.
 * @returns {boolean|boolean} - True if the string is blank, false otherwise.
 */
export const isBlank = (str) => {
    return !str || /^\s*$/.test(str);
}

/**
 * Returns array of items with id, which is private property of class.
 * @param data
 * @returns {{}}
 */
export const getItemsWithId = (data) => {
    if (data[0].id === undefined) {
        throw new Error("Data does not have an id property.");
    }

    let items = [];

    data.forEach(item => {
        let modifiedItem = {...item};
        modifiedItem.id = item.id;
        items.push(modifiedItem);
    });

    return items;
}

/**
 * Find item by id.
 * @param dataType - The type of data (stick / user / bid).
 * @param id - The id of the item to find.
 */
export const findItemById = (dataType, id) => {
    if (isNaN(id)) {
        throw new Error(`Id must be a number`);
    }

    const foundItem = data[dataType].find(item => item.id === id);
    if (!foundItem) {
        throw new Error(`${dataType} with id ${id} not found`);
    }

    return foundItem;
}