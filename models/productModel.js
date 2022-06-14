const mongoose = require("mongoose");

/**
* User Roles
*/
const owner = [
    "u7SSUfvUS5dG3LIm3IdqyJRJg5joacRQKTFs3Ogi",  // Groupe 1
    "F3QwUaEQKnTDVEHWr2sugb5AAfkoj0eh1qV9kua2",  // Groupe 2
    "3sr5p0cQUvFtJg1p2LZIam8gxAwzv1dbXS8kYDYJ",  // Groupe 3 
    "vEatKOIAq1aCZ5LiEHXQFMf45NOITuUooA4yO7aR",  // Groupe 4 
    "WJ8ceo5EQ5jAjpL4tFVeceQlUnfBQPf1zH6AYghu",  // Groupe 5 
    "Y1KgegUj7Zt5O2ZT0oLokHntbcRfxcj1ozEZM7ON",  // Groupe 6
    "A0bKllsQVY1zpsH3l7za3OCkAoKB2Pxzefwx460s",  // Groupe 7
    "0hJOj9B9547CsPjIFivqxgalHcpBhxFmnNAnISv6",  // Groupe 8
    "x8sOvUkVwx5EqCj974oE15f265T4xSLcCJoKrayX"   // Commun
];

/**
 * Product Schema
 * @private
 */
const productModel = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://i.imgur.com/pMdGwPV.jpg"
    },
    owner: {
        type: String,
        enum: owner,
        required: true
    },
    creator: {
        type: String,
        required: true,
        select: false
    }
});

module.exports = mongoose.model("productModel", productModel);
