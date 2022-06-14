const AuthUtils = require("../utils/auth");
const Utils = require("../utils/misc");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const SALTROUNDS = 10;
const USER_TOKEN_EXPIRATION = 86_400_000; //24h

const authGuardedRoutes = AuthUtils.authGuardedRoutes;


/**
* @function getUser
* @description Return user from given params
* @access private
*
* @param {object} data Search params
*
* @return {object} {exist:boolean, user}
*/
exports.getUser = async (data) => {
    return await getUser(data);
};
const getUser = async (data) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise(async (resolve, reject) => {
        try {
            let user = await User.findOne(data);
            if (!user) {
                return resolve({
                    exist: false,
                    user: null
                });
            }
            return resolve({
                exist: true,
                user: user
            });
        } catch {
            return resolve({
                exist: false,
                user: null
            });
        }
    });
};

/**
* @function authGuardedRoutesCheck
* @description Return routes that need to be logged to access
* @access public
*
* @param {req object} route Description
*
* @return {boolean} return if route need authguard
*/
exports.authGuardedRoutesCheck = (route) => {
    return (authGuardedRoutes[route.method].has("/"+route.originalUrl.split("/")[1]));
    //return (authGuardedRoutes[route.method].has(route.originalUrl));
};


/**
* @function authUserAuthorization
* @description Return if user is authorize to access those allowedRoutes
* @access public
*
* @param {type} req
* @param {type} res
* @param {type} next
*
* @return {void}
*/
exports.authUserAuthorization = async (req, res, next) => {
    try {
        let getUser = await AuthUtils.getConnectedUser(req);
        if (!getUser.success) {
            return res.status(getUser.code).json({
                success: false,
                date: {
                    message: getUser.message
                }
            });
        }
        next();
    } catch {
        return res.status(500).json({
            success: false,
            data: {
                message: "Internal error",
                error: error.message
            }
        });
    }
};


/**
* @function register
* @description Create new user in database
* @access public
*
* @param {type} req
* @param {type} res
*
* @return {void}
*/
exports.register = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.username) {
            return res.status(403).json({
                success: false,
                data: {
                    message: "Missing arguments"
                }
            });
        }
        let email = req.body.email.trim();
        let username = req.body.username.trim();

        if (!validator.validate(email)) {
            return res.status(403).json({
                success: false,
                data: { message: "Invalid arguments" }
            });
        }

        let isUsernameExist = await getUser({username: username});
        if (isUsernameExist.exist) {
            return res.status(403).json({
                success: false,
                data: { message: "Username already exist" }
            });
        }

        let isEmailExist = await getUser({email: email});
        if (isEmailExist.exist) {
            return res.status(403).json({
                success: false,
                data: { message: "Email already exist" }
            });
        }

        let password = req.body.password.trim();
        if (!AuthUtils.isValidPassword(password)) {
            return res.status(403).json({
                success: false,
                data: { message: "Password invalid. Must contain uppercase, lowercase, digits, symbols, length between 8 to 100, no spaces" }
            });
        }

        let hashedPassword = await bcrypt.hashSync(password, SALTROUNDS);

        let newUser = new User({
            "publicId": Utils.generateId(30),
            "username": username,
            "email": email.toLowerCase(),
            "password": hashedPassword,
            "owner": req.headers.owner
        });

        let user = await newUser.save();
        user.password = undefined;

        return res.status(200).json({
            success: true,
            data: {
                message: "New user added",
                user: user
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: { message: "Internal error", error: error.message }
        });
    }
};

/**
* @function login
* @description Create new user in database
* @access public
*
* @param {type} req
* @param {type} res
*
* @return {void}
*/
exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(403).json({
                success: false,
                data: {
                    message: "Missing arguments"
                }
            });
        }

        let email = req.body.email.trim().toLowerCase();
        let userWithGivenEmail = await getUser({email: email});
        let password = req.body.password;
        if (!userWithGivenEmail.exist || !userWithGivenEmail.user) {
            return res.status(403).json({
                success: false,
                data: { message: "Email or Password invalid" }
            });
        }

        let user = userWithGivenEmail.user;
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(403).json({
                success: false,
                data: { message: "Email or Password invalid" }
            });
        }

        user.token.token = Utils.generateId(100);
        user.token.expiration = Date.now() + USER_TOKEN_EXPIRATION;
        await user.save();
        user.password = undefined;

        return res.status(200).json({
            success: true,
            data: {
                message: "Well loggin",
                user: user
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: { message: "Internal error", error: error.message }
        });
    }
};
