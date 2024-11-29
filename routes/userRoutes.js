const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require('../controllers/userControllers');
const authmiddlewares = require('../middlewares/authmiddlewares');

const router = express.Router();

router.get('/getuser', authmiddlewares, getUserController);
router.put('/updateuser', authmiddlewares, updateUserController);
router.post('/updatepassword', authmiddlewares, updatePasswordController);
router.post('/resetpassword', authmiddlewares, resetPasswordController);
router.delete('/deleteuser/:id', authmiddlewares, deleteUserController);

module.exports = router;
