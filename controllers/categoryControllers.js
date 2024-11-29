const categoryModels = require("../models/categoryModels");

const createCategory = async(req, res)=>{
    try {
        const {title, imageUrl} = req.body;
        if(!title){
            return res.status(500).send({
                success:false,
                message:"Please Provide Category title",
            });
        }

        const newCategory = new categoryModels({title, imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message: "Category Created",
            newCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Create Category API",
            error,
        })
    }
}

const getAllCategory=  async(req, res)=>{
    try {
        const categorys = await categoryModels.find({});
        if(!categorys){
        return res.status(404).send({
            success: false,
            message: "Category Not Found",
            });    
        }
        res.status(200).send({
            success:true,
            totalCategory:categorys.length,
            categorys
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In getAll Category API",
            error,
        });
    }
}

const getCategory = async(req, res)=>{

    try {
        const categoryId = req.params.id;
        if(!categoryId){
            return res.status(500).send({
                success:false,
                message:"Plase Provide Category ID"
            });
        }

        const category = await categoryModels.findById(categoryId);
        if(!category){
            return res.status(500).send({
                success:false,
                message:"No Category Found"
            });
        }

        res.status(200).send({
            success:true,
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get Category API",
            error,
        });
    }
}


const updateCategory = async (req,res)=>{
    try {
        const {id} = req.params;
        const {title,imageUrl}= req.body;
        const updatedCategory = await categoryModels.findByIdAndUpdate(id,{title,imageUrl},{new:true});
        
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:"No Category Found",
            });
        }

        res.status(200).send({
            success:true,
            message:"Category Updated SuccessFully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Update Category API",
            error,
        });
    }
}


const deleteCategory = async(req, res)=>{
    try {
    const categoryId = req.params.id;
        if(!categoryId){
            res.status(500).send({
                success: false,
                message: "Please provide category ID"
            });
        }

        await categoryModels.findByIdAndDelete(categoryId);

        res.status(200).send({
            success: true,
            message:"Category Deleted Successfully"
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error In delete Category API",
            error,
        });
    }
}



module.exports = {createCategory,getAllCategory, getCategory, updateCategory,deleteCategory}