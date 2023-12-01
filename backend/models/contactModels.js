const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true, "Please Add the contact name "]
    },
    email:{
        type:String,
        required:[true, "Please Add the email "]
    },
    mobile:{
        type:String,
        required:[true, "Please Add the mobile no "]
    }
},{
    timestamps:true,
}
);
module.exports=mongoose.model("Contact",contactSchema);