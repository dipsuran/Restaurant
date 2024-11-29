const foodModal = require("../models/foodModels");
const orderModels = require("../models/orderModels");

const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New Food Item Created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Crate Food API",
      error,
    });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    if (!foods) {
      return res.status(500).send({
        success: false,
        message: "No Food Items Was Found",
        error,
      });
    }

    res.status(200).send({
      success: true,
      totalFood: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get All Foods API",
      error,
    });
  }
};

const getFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Food ID",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this Id",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Food API",
      error,
    });
  }
};

const getFoodByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Restaurant ID",
      });
    }
    const food = await foodModal.find({ restaurant: restaurantId });

    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found with this Id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food base on Restaurant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In food by Restaurant API",
      error,
    });
  }
};

const updateFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Food ID",
      });
    }

    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    const updatedFood = await foodModal.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        restaurant,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item Was up",
      updatedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update food API",
      error,
    });
  }
};

const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Food ID",
      });
    }

    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No Food Found",
      });
    }

    await foodModal.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item Was Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In delete food API",
      error,
    });
  }
};

// place order fun..

const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please Provide cart and payment",
      });
    }

    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModels({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In place order API",
      error,
    });
  }
};

const orderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid Order Id",
      });
    }

    const { status } = req.body;
    if (
      !status ||
      !["preparing", "prepare", "on the way", "deliverd"].includes(status)
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid or missing status",
      });
    }

    const order = await orderModels.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Order Status Updated",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In order status API",
      error,
    });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFood,
  getFoodByRestaurant,
  updateFood,
  deleteFood,
  placeOrder,
  orderStatus,
};
