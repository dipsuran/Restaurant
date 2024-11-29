const restaurantModel = require('../models/restaurantModels');

const createRestaurant = async(req, res)=>{
    try {
        const {title, imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body;  
        
        // validation
        if(!title || !coords){
           return res.status(500).send({
                success:false,
                message: "Please provide title and address"
            });
        }   

        const newRestaurant = new restaurantModel({title, imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords});

        await newRestaurant.save();
        res.status(201).send({
            success: true,
            message: "new Restaurant Created Successfully",
        })
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success: false,
            message: "Error In Create Restaurant API",
            error,
        })
    }
}

const getAllRestaurnts = async (req, res)=>{
    try {
        const restaurants = await restaurantModel.find({});
        if(!restaurants){
          return  res.status(500).send({
                success: false,
                message: "No Restaurant Availible",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants,
        });
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success: false,
            message: "Error In get all Restaurants API",
            error,
        })
    }
}

const getRestaurnt = async(req, res)=>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return  res.status(404).send({
                  success: false,
                  message: "Please Provide Restaurant ID",
              });
          }

        const restaurant = await restaurantModel.findById(restaurantId);

        if(!restaurant){
            return  res.status(404).send({
                  success: false,
                  message: "No Restaurant Found",
              });
          }
          res.status(200).send({
            success: true,
            restaurant,
        });


    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success: false,
            message: "Error In get Restaurant API",
            error,
        })
    }
}


const deleteRestaurnt = async (req, res) =>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return  res.status(404).send({
                  success: false,
                  message: "Please Provide Restaurant ID",
              });
          }

         await restaurantModel.findByIdAndDelete(restaurantId)
          res.status(200).send({
            success: true,
            message:"Restaurnt Deleted Successfully",
        });

    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success: false,
            message: "Error In Delete Restaurant API",
            error,
        })
    }
}

module.exports = { createRestaurant,getAllRestaurnts, getRestaurnt,deleteRestaurnt}