const express = require("express");
const authmiddlewares = require("../middlewares/authmiddlewares");
const adminMiddleware = require("../middlewares/adminMiddlewares");
const {
  createFood,
  getAllFoods,
  getFood,
  getFoodByRestaurant,
  updateFood,
  deleteFood,
  placeOrder,
  orderStatus,
} = require("../controllers/foodControllers");

const router = express.Router();

router.post("/create", authmiddlewares, createFood);
router.get("/getall", getAllFoods);
router.get("/get/:id", getFood);
router.get("/getFoodByResturant/:id", getFoodByRestaurant);
router.put("/update/:id", authmiddlewares, updateFood);
router.delete("/delete/:id", authmiddlewares, deleteFood);

// order router
router.post("/placeorder", authmiddlewares, placeOrder);
router.post("/orderstatus/:id", authmiddlewares, adminMiddleware, orderStatus);

module.exports = router;
