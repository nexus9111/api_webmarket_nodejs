var express = require('express');
var router = express.Router();
var ProductCtrl = require("../controllers/productController");

router.post('/', (req, res) => {
    ProductCtrl.newProduct(req, res);
});

router.get('/', (req, res) => {
    ProductCtrl.getAllProducts(req, res);
});

router.post('/:id', (req, res) => {
    ProductCtrl.editProduct(req, res);
});

router.get('/:id', (req, res) => {
    ProductCtrl.getOneProducts(req, res);
});

router.delete('/:id', (req, res) => {
    ProductCtrl.deleteProduct(req, res);
})

module.exports = router;