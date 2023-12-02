const express = require("express")
const validationToken = require("../middleware/validateTokenHandeler")

const router = express.Router();

const {registerUser,loginUser,currentUser} = require("../controllers/userControllers")

router.post("/register",registerUser).post("/login",loginUser);

router.get("/current",validationToken,currentUser);

module.exports = router;