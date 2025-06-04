const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.getLogin);

router.get('/logout', (req, res) => {
  res.render('logout');
});
router.post('/logout', authController.logout);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);


module.exports = router;
