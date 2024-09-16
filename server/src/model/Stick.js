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
    endDate;

    constructor(name, description, image, estimatedPrice, length, feature, typeOfTree, weight, endDate) {
        this.#id = ++Stick.#idCounter;

        validateStaticStickProperties(name, description, estimatedPrice);
        this.name = name;
        this.description = description;
        this.estimatedPrice = estimatedPrice;

        // Image checking: if no image is provided, set a placeholder image
        if (isBlank(image)) {
            console.log("Image is blank")
            this.image = "https://cdn.prod.website-files.com/668fe0172c60fac7e678ba19/668fe0172c60fac7e678bae4_placeholder.svg"
        } else {
            this.image = image;
        }

        validateDynamicProperties(length, feature, typeOfTree, weight);
        this.length = length;
        this.feature = feature;
        this.typeOfTree = typeOfTree;
        this.weight = weight;

        validateStickDate(endDate);
        this.endDate = endDate;
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

export function validateStickDate(endDate) {
    const date = new Date(endDate);
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date: must be a valid date.');
    }

    if (date < new Date()) {
        throw new Error('Invalid date: must be a future date.');
    }
}