let express = require('express');
let router = express.Router();
let AuthCtrl = require('../controllers/authController');
let UserCtrl = require('../controllers/userController');

router.post('/login', (req, res) => {
    AuthCtrl.login(req, res);
});

router.post('/register', (req, res) => {
    AuthCtrl.register(req, res);
});

router.post('/me', (req, res) => {
    UserCtrl.editMyselfContent(req, res);
})

module.exports = router;