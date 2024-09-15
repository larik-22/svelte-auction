import {Stick} from "../model/Stick.js";

let sticks = [
    new Stick(1, "Wizard Stick", "Majestic wonder stick for all your wizarding needs.", "", 45, "long", "straight", "Oak", "medium", "2024-12-31"),
    new Stick(2, "Pistol Stick", "A really cool stick that looks like a pistol.", "", 70, "medium", "curved", "Pine", "light", "2024-11-15"),
]

console.log(sticks.filter(stick => stick.id === 1)[0]);