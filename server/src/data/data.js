import {Stick} from "../model/Stick.js";
import {checkUserPassword, User} from "../model/User.js";
import {Bid} from "../model/Bid.js";

export const data = {
    bids: [],
    sticks: [
        new Stick("Wizard Stick", "Majestic wonder stick for all your wizarding needs.", "https://utfs.io/f/199fd94f-51c3-4c00-ad30-3613e8444f9b-mxgjju.png", 45, "long", "straight", "Oak", "medium", null, "2024-12-31"),
        new Stick( "Pistol Stick", "A really cool stick that looks like a pistol.", "https://utfs.io/f/14d3c81f-4ef8-4460-a55f-1a47e2d2eda6-jm13wm.png", 70, "short", "curved", "Pine", "light", "2024-11-14", "2024-11-15"),
        new Stick( "Wand Stick", "Magical wand stick of finest quality.", "https://utfs.io/f/fd0d6837-d565-4bd0-b1a0-6ff844e9613b-juxa5t.png", 55, "short", "knotty", "Maple", "light", null, "2025-01-01"),
        new Stick("Hobbit Stick", "A stick for the little, but strong people.", "https://utfs.io/f/KRle4R7mRPpsLoFZfldE8I5tnP6CeYGjhikuy7sQVOXMKWNx", 30, "medium", "straight", "Bamboo", "medium", "2024-09-14", "2024-09-15", false),
    ],
    users: [
        new User("bid@bidder.com", "Bidder123"),
        new User("admin@admin.com", "Admin123", true),
    ]
}

data.bids.push(new Bid(data.users[0].id, data.sticks[3].id, 50, true));

