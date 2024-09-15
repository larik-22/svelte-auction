import {isBlank} from "../utils/utils.js";

export class Stick {
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

    constructor(id, name, description, image, estimatedPrice, length, feature, typeOfTree, weight, endDate) {
        if (!id || typeof id !== 'number') {
            throw new Error('Invalid id: must be a number.');
        }
        this.#id = id;

        validateStaticStickProperties(name, description, estimatedPrice);
        this.name = name;
        this.description = description;
        this.estimatedPrice = estimatedPrice;

        // Image checking
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

    // length checking
    for (let property of [name, description]) {
        if (isBlank(property)) {
            throw new Error('Invalid property: must not be blank.');
        }
    }
}

export function validateDynamicProperties(length, feature, typeOfTree, weight){
    const possibleLength = ['short', 'medium', 'long'];
    const possibleFeatures = ['straight', 'curved', 'knotty', 'special'];
    const possibleTypeOfTree = ['oak', 'maple', 'pine', 'bamboo', 'cherry', 'birch', 'mahogany'];
    const possibleWeight = ['light', 'medium', 'heavy'];

    for (let property of [length, feature, typeOfTree, weight]) {
        if (isBlank(property)) {
            throw new Error('Invalid property: must not be blank.');
        }
    }

    if (!possibleLength.includes(length.toLowerCase())) {
        throw new Error('Invalid length: must be short, medium or long.');
    }

    if (!possibleFeatures.includes(feature.toLowerCase())) {
        throw new Error('Invalid feature: must be light, medium or heavy.');
    }

    if (!possibleTypeOfTree.includes(typeOfTree.toLowerCase())) {
        throw new Error('Invalid typeOfTree: must be oak, maple, pine, bamboo, cherry, birch or mahogany.');
    }

    if (!possibleWeight.includes(weight.toLowerCase())) {
        throw new Error('Invalid weight: must be light, medium or heavy.');
    }
}

export function validateStickDate(endDate){
    try {
        const date = new Date(endDate);
        if (date < new Date()) {
            throw new Error('Invalid date: impossible to make auction in past.');
        }
    } catch (e) {
        throw new Error('Invalid date: must be a valid date.');
    }
}