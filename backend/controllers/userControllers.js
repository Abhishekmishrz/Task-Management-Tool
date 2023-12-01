const asyncHandeler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModels")

// @des Register the user 
// @routs POST /api/users
const registerUser =asyncHandeler(async(req,res)=>{
    const {username,email,password} =req.body;
    console.log(req.body,"This is req.body");
    if(! username || !email || !password){
        res.status(400);
        throw new Error("All field manadtory !")
    }
    const userAvilable = await User.findOne({email});
    if(userAvilable){
        res.status(400);
        throw new Error("User already register");
    }
    const user =await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 10),
    });
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User Data is not valid ")
    }
    // res.json({message:"Register the user "})
    
}) 

// @des login the user 
// @routs POST /api/users
const loginUser =asyncHandeler(async(req,res)=>{
    const {email,password} =req.body;
    // console.log(req.body,"This is req.body");
    if(!email || !password){
        res.status(400);
        throw new Error("All field manadtory !")
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401)
        throw new Error("Email and password is not valid")
    }
})

// @des cureent user  info
// @routs GET /api/users
// @access private
const currentUser =asyncHandeler(
    async(req,res)=>{
        res.json(req.user)
    }
)


module.exports = {registerUser,loginUser,currentUser}