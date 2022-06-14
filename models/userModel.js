const mongoose = require("mongoose");
const utils = require("../utils/misc");

/**
* User Roles
*/
const roles = ["user", "admin", "superAdmin", "banned"];
const owners = utils.owner();

/**
 * User Schema
 * @private
 */
const userModel = new mongoose.Schema({
    publicId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 128,
        required: true,
    },
    role: {
        type: String,
        enum: roles,
        default: "user",
    },
    owner: {
        type: String,
        enum: owners,
        default: "x8874kVwx5EqCdd4oE15f265T4kjsdgcCJoKrayX"
    },
    token: {
        expiration: {
            type: Number,
            default: Date.now()
        },
        token: {
            type: String
        }
    },
    content: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("userModel", userModel);
