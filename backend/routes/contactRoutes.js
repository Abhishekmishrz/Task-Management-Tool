const express = require("express");
const validationToken = require("../middleware/validateTokenHandeler");
const router = express.Router();


const { getContact ,getSpecificContact,createContact,updateContact,deleteContact  } = require("../controllers/contactControllers");


router.use(validationToken)
router.route("/").get( getContact ).post(createContact);
router.route("/:id").get( getSpecificContact ).put(updateContact).delete(deleteContact)


module.exports = router;