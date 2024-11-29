const express = require('express');
const authmiddlewares = require('../middlewares/authmiddlewares');
const { createRestaurant, getAllRestaurnts, getRestaurnt, deleteRestaurnt } = require('../controllers/restaurantControllers');


const router = express.Router();

router.post('/create', authmiddlewares, createRestaurant);
router.get('/getall', getAllRestaurnts);
router.get('/get/:id', getRestaurnt);
router.delete('/delete/:id',authmiddlewares, deleteRestaurnt);

module.exports = router;
