const userModel = require('../models/userModels');
const bcrypt = require("bcrypt");

    const getUserController = async(req,res)=>{
        try {
            const user = await userModel.findById({_id:req.body.id});

            if(!user){
                return res.status(404).send({
                    success: false,
                    message: "User Not Found",
                  });
            }
            user.password = undefined;

            res.status(200).send({
                success:true,
                message: 'User get Successfully',
                user,
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error In getUser API",
                error,
              });
        }
    };

    const updateUserController = async(req,res)=>{
        try {
            const user = await userModel.findById({_id:req.body.id});

            if(!user){
                return res.status(404).send({
                    success: false,
                    message: "User Not Found",
                  });
             }
           const {username, phone, address} = req.body;
           if(username) user.username = username;
           if(phone) user.phone = phone;
           if(address) user.address = address;

           await user.save();
            res.status(200).send({
                success:true,
                message: 'User Upadated Successfully',
                user,
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error In getUser API",
                error,
              });
        }
    };

    const updatePasswordController = async(req,res)=>{
        try {
            const user = await userModel.findById({_id:req.body.id});
            if(!user){
                return  res.status(404).send({
                    success: false,
                    message: "User Note Found",
                    error,
                  });
            }
            const {oldPassword, newPassword} = req.body;
            if(!oldPassword || !newPassword){
                return  res.status(500).send({
                    success: false,
                    message: "Please Provide old or new password",
                    error,
                  });
            }

            const isAuth = bcrypt.compareSync(oldPassword, user.password);
            if (!isAuth) {
                return res.status(500).send({
                  success: false,
                  message: "Invalid Old password",
                });
              }

            const hashedPassword =  bcrypt.hashSync(newPassword, 10);
            user.password = hashedPassword;
            await user.save();
            res.status(200).send({
                success:true,
                message: 'Password is Successfully Upadated',

            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error In update password API",
              });
        }
    };

    const resetPasswordController = async(req,res)=>{
        try {
            const {email, newPassword, answer} = req.body;
            if(!email || !newPassword || !answer){
              return  res.status(500).send({
                    success: false,
                    message: "Please Provide All Fields",
                    error,
                  });
            }
            const user = await userModel.findOne({email,answer});
            if(!user){
             return res.status(500).send({
                    success: false,
                    message: "User Note Found or invalid answer",
                    error,
                  });
            }

            const hashedPassword =  bcrypt.hashSync(newPassword, 10);;
            user.password = hashedPassword;
            await user.save();
            res.status(200).send({
                success:true,
                message: 'Reset Password is Successfully Upadated',
                user,
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error In reset password API",
                error,
              });
        }
    };

    const deleteUserController = async(req,res)=>{
        try{
            await userModel.findByIdAndDelete(req.params.id);
            return res.status(200).send({
                success:true,
                message: 'Your account has been deleted',
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error In delete user API",
                error,
              });
        }
    }

module.exports = { getUserController , updateUserController, updatePasswordController, resetPasswordController, deleteUserController};