const express = require('express');
const authmiddlewares = require('../middlewares/authmiddlewares');
const { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryControllers');


const router = express.Router();

router.post('/create', authmiddlewares, createCategory);
router.get('/getall', getAllCategory);
router.get('/get/:id', getCategory);
router.put('/update/:id',authmiddlewares, updateCategory);
router.delete('/delete/:id',authmiddlewares, deleteCategory);

module.exports = router;
