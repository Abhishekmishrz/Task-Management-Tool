const asyncHandeler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validationToken = asyncHandeler(async(req,res,next)=>{
    let token;
    let autoHeader= req.headers.Authorization || req.headers.authorization;
    if(autoHeader && autoHeader.startsWith("Bearer")){
        token = autoHeader.split(" ")[1];
        jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET,(err, decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized ")
            }
            req.user = decoded.user;
            // console.log(decoded)
            next();
        })
        // console.log("token",token)
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing")
        }
    }
})
module.exports= validationToken;