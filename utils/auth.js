const User = require("../models/userModel");
var passwordValidator = require("password-validator");


var schema = new passwordValidator();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .has().symbols()                                // Must have at symbols
    .is().not().oneOf(["P@ssw0rd", "P@ssword123", "@Zerty12345"]); // Blacklist these values


/**
 * @constant define routes that need to be auth
 *
*/
exports.authGuardedRoutes = {
    "GET": new Set([]),
    "POST": new Set(["/products"]),
    "DELETE": new Set(["/products"]),
    "PUT": new Set([])
};

/**
* @function getConnectedUser
* @description Return user found with the given token
* @access public
*
* @param {object} req Req object
*
* @return {object} {success, code, message, user}
*/
exports.getConnectedUser = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!req.headers.authorization) {
                return resolve({
                    success: false,
                    code: 403,
                    message: "Unauthrized",
                    user: null
                });
            }
            let user = await User.findOne({ "token.token" : req.headers.authorization });
            if (!user) {
                return resolve({
                    success: false,
                    code: 404,
                    message: "User not found",
                    user: null
                });
            }
            if (user.token.expiration < Date.now() || user.role === "banned") {
                return resolve({
                    success: false,
                    code: 403,
                    message: "Unauthrized",
                    user: null
                });
            }
            return resolve({
                success: true,
                code: 200,
                message: "User authorized",
                user: user
            });
        } catch (error) {
            console.error(error);
            return reject({
                success: false,
                code: 500,
                message: "Internal error"
            });
        }
    });
};


/**
* @function isValidPassword
* @description return if password is valid
* @access public
*
* @param {string} password
*
* @return {boolean}
*/
exports.isValidPassword = (password) => {
    return schema.validate(password);
};
