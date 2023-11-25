import userModel  from "../config/models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelpers.js";
import JWT from "jsonwebtoken";




export const registerController = async(req,res)=>{

try {
    const {name,email,password,phone,address}=req.body
    if(!name){
        return res.send({message:'Name is required '})
    }
    if(!email){
        return res.send({message:'Email is required '})
    }
    
    if(!password){
        return res.send({message:'Password is required '})
    }
    
    if(!phone){
        return res.send({message:'Phone is required '})
    }
    
    if(!address){
        return res.send({message:'Address is required '})
    }
     //check user
    const exisitingUser = await userModel.findOne({email})
    // if existing user 
    if(exisitingUser){
        return res.status (200).send({
            success:false,
            message:'Already register please login',
        })
    }
// register user
const hashedPassword = await hashPassword(password)
// save
const user = new userModel({name,
    email,
    phone,
    address,
    password:hashedPassword
})
await user.save()
 res.status(201).send({
    success:true,
    message:'User register successfully',
    user
 })
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error registeration",
        error
    })
}
}
export const logincontoller =async(req,res)=>{
try {
    const {email,password}=req.body
    // validation 
    if(!email||!password){
    return res.status (404).send({
success:false,
message:"Invalid email or password"
})
} 
// check user

const user = await userModel.findOne({email})
if(!user){
    return res.status(404).send({
        success:false,
        message:'email is not registered '
    })
}
const match = await comparePassword(password,user.password)
if(!match){
    return res.status(200).send({
        success:false,
        message:'Invalid password  '
    })
}
// token creation 
const token = await JWT .sign({_id:user._id},process.env.JWT_SECRET,{
    expiresIn:"7d",
})
res.status(200).send({
    success:true,
    message:'login successfully',
    user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address

    },
    token,
})
} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in login',
        error
    })
    
}
};
// test controller
export const testController  =async(req,res)=>{
res.send("protected routes")
}