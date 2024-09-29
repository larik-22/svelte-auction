import {isBlank} from "../utils/utils.js";

export class Stick {
    static #idCounter = 0;

    #id;
    name;
    description;
    estimatedPrice;
    image;
    length;
    feature;
    typeOfTree;
    weight;
    startDate;
    endDate;
    bids;
    validateFutureDates;

    constructor(name, description, image, estimatedPrice, length, feature, typeOfTree, weight, startDate, endDate, validateFutureDates = true) {
        this.#id = ++Stick.#idCounter;
        this.bids = [];
        this.validateFutureDates = validateFutureDates;

        validateStaticStickProperties(name, description, estimatedPrice);
        this.name = name;
        this.description = description;
        this.estimatedPrice = estimatedPrice;

        // Image checking: if no image is provided, set a placeholder image
        if (isBlank(image)) {
            this.image = "https://cdn.prod.website-files.com/668fe0172c60fac7e678ba19/668fe0172c60fac7e678bae4_placeholder.svg"
        } else {
            this.image = image;
        }

        validateDynamicProperties(length, feature, typeOfTree, weight);
        this.length = length;
        this.feature = feature;
        this.typeOfTree = typeOfTree;
        this.weight = weight;

        validateStickDate(startDate, endDate);
        this.startDate = startDate === null || startDate === undefined ? new Date() : new Date(startDate);
        this.endDate = new Date(endDate);
    }

    get id() {
        return this.#id;
    }

    get idCounter() {
        return Stick.#idCounter;
    }
}

export function validateStaticStickProperties(name, description, estimatedPrice) {
    // type checking
    if (!name || typeof name !== 'string') {
        throw new Error('Invalid name: must be a string.');
    }

    if (!description || typeof description !== 'string') {
        throw new Error('Invalid description: must be a string.');
    }

    if (!estimatedPrice || typeof estimatedPrice !== 'number') {
        throw new Error('Invalid estimatedPrice: must be a number.');
    }

    if(estimatedPrice < 0) throw new Error('Invalid estimatedPrice: must be a positive number.');

    // length checking
    for (let property of [name, description]) {
        if (isBlank(property)) {
            // log which property is blank
            throw new Error(`Invalid ${property === name ? 'name' : 'description'}: must not be blank.`);
        }
    }
}

export function validateDynamicProperties(length, feature, typeOfTree, weight) {
    const possibleLength = ['short', 'medium', 'long'];
    const possibleFeatures = ['straight', 'curved', 'knotty', 'special'];
    const possibleTypeOfTree = ['oak', 'maple', 'pine', 'bamboo', 'cherry', 'other'];
    const possibleWeight = ['light', 'medium', 'heavy'];

    for (let property of [length, feature, typeOfTree, weight]) {
        if (isBlank(property)) {
            throw new Error('Invalid property: must not be blank.');
        }
    }

    if (!possibleLength.includes(length.toLowerCase())) {
        throw new Error('Invalid length: must be ' + possibleLength.join(", ") + '.');
    }

    if (!possibleFeatures.includes(feature.toLowerCase())) {
        throw new Error('Invalid feature: must be ' + possibleFeatures.join(", ") + '.');
    }

    if (!possibleTypeOfTree.includes(typeOfTree.toLowerCase())) {
        throw new Error('Invalid typeOfTree: must be ' + possibleTypeOfTree.join(", ") + '.');
    }

    if (!possibleWeight.includes(weight.toLowerCase())) {
        throw new Error('Invalid weight: must be ' + possibleWeight.join(", ") + '.');
    }
}

export function validateStickDate(startDateStr, endDateStr, validateFutureDates = true) {
    const startDate = new Date(startDateStr === null || startDateStr === undefined ? new Date() : startDateStr);

    if (isNaN(startDate.getTime())) {
        throw new Error('Invalid start date: must be a valid date.');
    }

    const endDate = new Date(endDateStr);
    if (isNaN(endDate.getTime())) {
        throw new Error('Invalid end date: must be a valid date.');
    }

    if (endDate < startDate) {
        throw new Error('Invalid end date: endDate must be after startDate.');
    }

    if (this?.validateFutureDates) {
        // if startDate is not the current date, check if it is a future date
        const currentDate = new Date();
        if (startDateStr !== null && startDateStr !== undefined && startDate < currentDate) {
            throw new Error('Invalid start date: must be a future date.');
        }

        if (endDate < currentDate) {
            throw new Error('Invalid end date: must be a future date.');
        }
    }
}
