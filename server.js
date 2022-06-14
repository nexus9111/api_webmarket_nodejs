require("dotenv-safe").config();

const app = require("./conf/express");
const mongoose = require("./conf/mongoose");

const Utils = require("./utils/misc");

const AuthCtrl = require("./controllers/authController");
const moment = require("moment");

const auth = require("./router/userRouter");
const products = require("./router/productRouter");

mongoose.connect();

app.all("*", (req, res, next) => {
    if (!Utils.allowedRoutesCheck(req)) {
        return res.status(500).json({
            success: false,
            data: {
                message: "access denied"
            }
        });
    } else {
        let owner = Utils.checkOwner(req);
        if (!owner.valid && req.originalUrl != "/") {
            return res.status(500).json({
                success: false,
                data: {
                    message: "invalid owner token"
                }
            });
        }
	    //console.log(req.method)
        console.log("🔵 (" + moment().format('L') + " " + moment().format('LTS') + " " + owner.owner + ") called route " + req.method + " => " + req.originalUrl);
        if (AuthCtrl.authGuardedRoutesCheck(req)) {
            AuthCtrl.authUserAuthorization(req, res, next);
        } else {
            next();
        }
    }
});

app.route("/")
    .get((req, res) => {
        res.status(200).json({
            success: true,
            data: {
                message: "Welcome to this REST api by nexus9111",
                version: "1.0.0",

            }
        });
    });

app.use("/users", auth);
app.use("/products", products);

app.listen(process.env.API_PORT, () => {
    console.log({
        "🎯 Port": process.env.API_PORT,
        "✅ App listening at": "http://localhost:"+process.env.API_PORT,
        "🕦": moment().format("l") + " " + moment().format("LTS")
    });
});
