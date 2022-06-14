const User = require("../models/userModel");
const Auth = require("../utils/auth")
const validator = require("email-validator");

exports.editMyselfContent = async (req, res) => {
    try {
        let user = await Auth.getConnectedUser(req);
        if (!user.success) {
            return res.status(user.code).json({
                success: false,
                date: {
                    message: user.message
                }
            });
        }
        let connectedUser = user.user;
        if (req.body.content) {
            connectedUser.content = typeof req.body.content === "object" ? JSON.stringify(req.body.content) : req.body.content.toString();
        }

        if (req.body.email && validator.validate(req.body.email)) {
            connectedUser.email = req.body.email
        }

        await connectedUser.save();

        return res.status(200).json({
            success: true,
            data: {
                message: "User edited",
                user: connectedUser
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                message: "Internal error",
                error: error.message
            }
        });
    }
}