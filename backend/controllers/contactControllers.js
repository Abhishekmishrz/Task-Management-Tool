const asyncHandeler = require("express-async-handler")
const Contact = require("../models/contactModels")

// @des Get all the data 
// @routs GET /api/contacts
// @access public
const getContact =asyncHandeler(
    async(req,res)=>{
        const contacts = await Contact.find({user_id:req.user.id});
        res.status(200).json(contacts);
    }
) 

// @des Get specific user the data 
// @routs GET  /api/contacts/:id
// @access public
const getSpecificContact = asyncHandeler( async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});

// @des Create the  data 
// @routs POST /api/contacts
// @access public
const createContact =asyncHandeler( async(req,res)=>{
    // console.log(req.body,"req.body");
    const {name,email,mobile} =req.body;
    if(! name || !email || !mobile){
        res.status(400);
        throw new Error("All field manadtory !")
    }
    const contact =await Contact.create({
        name,
        email,
        mobile,
        user_id : req.user.id
    });
    res.status(201).json(contact);
});
// @des Update the data 
// @routs PUT /api/contacts/:id
// @access public
const updateContact =asyncHandeler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts")
    }
    const updatedContact =await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});
//  Delete the data 
// @routs DELETE /api/contacts/:id
// @access public
const deleteContact =asyncHandeler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to delete other user contacts")
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
})


module.exports={ getContact ,getSpecificContact,createContact,updateContact,deleteContact }