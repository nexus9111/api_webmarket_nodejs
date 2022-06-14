const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
var rateLimit = require("express-rate-limit");

/**
* Express instance
* @public
*/

const app = express();
app.use(helmet());

/**
 *  protect from dos 
 */
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 * 60 * 1000ms = 15min
    max: 10_000,
    message: {
        status: 403,
        success: false,
        message: "Too many request from this IP, DDoS is bad 😈 ..."
    }
});
app.use(limiter);

app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024
    },
}));


/**
 * parse body params and attache them to req.body
 */
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "20mb" }));


/**
 * enable CORS - Cross Origin Resource Sharing
 */
app.use(cors());
app.options("*", cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, GET, DELETE, OPTIONS");
    next();
});

module.exports = app;