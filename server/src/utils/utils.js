/**
 * Check if a string is blank.
 * Used regular expression to check if a string is blank.
 * @param str - The string to check.
 * @returns {boolean|boolean} - True if the string is blank, false otherwise.
 */
export function isBlank(str) {
    return !str || /^\s*$/.test(str);
}