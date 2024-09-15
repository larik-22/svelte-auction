/**
 * Check if a string is blank.
 * Used regular expression to check if a string is blank.
 * @param str - The string to check.
 * @returns {boolean|boolean} - True if the string is blank, false otherwise.
 */
export function isBlank(str) {
    return !str || /^\s*$/.test(str);
}

/**
 * Returns array of items with id, which is private property of class.
 * @param data
 * @returns {{}}
 */
export function getItemsWithId(data){
    if(data[0].id === undefined){
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