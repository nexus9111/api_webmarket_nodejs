const User = require("../models/userModel");
const Product = require("../models/productModel");
const AuthCtrl = require("./authController");
const Utils = require("../utils/misc")

exports.newProduct = async (req, res) => {
    try {
        if (!req.body.image || !req.body.content) {
            return res.status(400).json({
                success: false,
                data: {
                    message: "Missing arguments"
                }
            });
        }

        if (typeof req.body.image !== "string") {
            return res.status(404).json({
                success: false,
                data: {
                    message: "Invalid image format, please put a imgur link like https://i.imgur.com/pMdGwPV.jpg"
                }
            })
        }

        let user = await AuthCtrl.getUser({ "token.token": req.headers.authorization });
        let creator = user.user.publicId;
        let newProduct = new Product({
            "image": req.body.image,
            "content": typeof req.body.content === "object" ? JSON.stringify(req.body.content) : req.body.content.toString(),
            "owner": req.headers.owner,
            "creator": creator
        })

        await newProduct.save();
        newProduct.creator = undefined;

        return res.status(200).json({
            success: true,
            data: {
                message: "Product save",
                product: newProduct
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {
                message: "Internal error"
            }
        });
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        let products = await Product.find({ "owner": req.headers.owner });
        if (!products || products.length === 0) {
            products = [];
        }

        return res.status(200).json({
            success: true,
            data: {
                message: "Succes get products",
                products: products
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {
                message: "Internal error"
            }
        });
    }
}

exports.getOneProducts = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            product = {};
        }

        return res.status(200).json({
            success: true,
            data: {
                message: "Succes get products",
                product: product
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {
                message: "Internal error"
            }
        });
    }
}

exports.editProduct = async (req, res) => {
    try {
        if (req.body.image && typeof req.body.image !== "string") {
            return res.status(404).json({
                success: false,
                data: {
                    message: "Invalid image format, please put a imgur link like https://i.imgur.com/pMdGwPV.jpg"
                }
            })
        }

        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({
                success: false,
                data: {
                    message: "Product not found"
                }
            });
        }

        if (req.body.image) {
            product.image = req.body.image;
        }

        if (req.body.content) {
            product.content = typeof req.body.content === "object" ? JSON.stringify(req.body.content) : req.body.content.toString();
        }

        await product.save();
        product.creator = undefined;

        return res.status(200).json({
            success: true,
            data: {
                message: "Product edited",
                product: product
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {
                message: "Internal error"
            }
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({
                success: false,
                data: {
                    message: "Product not found"
                }
            });
        }

        if (product.owner !== req.headers.owner) {
            return res.status(400).json({
                success: false,
                data: {
                    message: "You are not the owner of this product"
                }
            });
        }

        await product.remove();

        return res.status(200).json({
            success: true,
            data: {
                message: "Product deleted"
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {
                message: "Internal error"
            }
        });
    }
} 