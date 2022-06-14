const crypto = require("crypto");

const allowedRoutes = new Set(["/", "/users", "/products"]);

exports.owner = () => {
    res = [];
    for (var prop in owner) {
        res.push(prop);
    }
    return res;
}

const owner = {
    "u7SSUfvUS5dG3LIm3IdqyJRJg5joacRQKTFs3Ogi": "Groupe 1", 
    "F3QwUaEQKnTDVEHWr2sugb5AAfkoj0eh1qV9kua2": "Groupe 2",  
    "3sr5p0cQUvFtJg1p2LZIam8gxAwzv1dbXS8kYDYJ": "Groupe 3",  
    "vEatKOIAq1aCZ5LiEHXQFMf45NOITuUooA4yO7aR": "Groupe 4", 
    "WJ8ceo5EQ5jAjpL4tFVeceQlUnfBQPf1zH6AYghu": "Groupe 5", 
    "Y1KgegUj7Zt5O2ZT0oLokHntbcRfxcj1ozEZM7ON": "Groupe 6", 
    "A0bKllsQVY1zpsH3l7za3OCkAoKB2Pxzefwx460s": "Groupe 7", 
    "x8sOvUkVwx5EqCj974oE15f265T4xSLcCJoKrayX": "Groupe 8" ,  
    "0hJOj9B9547CsPjIFivqxgalHcpBhxFmnNAnISv6": "[COMMUN]"  
}
/**
* @function allowedRoutesCheck
* @description Check if route called is an authorized route
* @access public
*
* @param {req object} route req object
*
* @return {boolean} authorized route
*/
exports.allowedRoutesCheck = (route) => {
    return (allowedRoutes.has("/"+route.originalUrl.split("/")[1]));
};


/**
* @function generateId
* @description Return random id
* @access public
*
* @param {number} idLength
*
* @return {string}
*/
exports.generateId = (idLength) => {
    return crypto.randomBytes(idLength).toString("hex");
};


exports.checkOwner = (req) => {
    if (!req.headers.owner) {
        return {
            valid: false,
            owner: null
        }
    }
    let id = req.headers.owner;
    if (!owner[id]) {
        return {
            valid: false,
            owner: null
        }
    }
    return {
        valid: true,
        owner: owner[id]
    }
}