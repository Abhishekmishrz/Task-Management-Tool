const express = require("express");
const errorHandeler = require("./middleware/errorHandelr");
const connectDb= require("./config/dbConnection");
const cors = require("cors")

const dotenv = require("dotenv").config()
const app =express();
const port =process.env.PORT || 5000;

const corsOptions={
	origin:`${process.env.REACT_APP_API_BASE_URL}`,
	methods: "GET,PUT,POST,DELETE",
};
app.use(cors(corsOptions));


connectDb();

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/",require("./routes/userRoutes"))
app.use(errorHandeler);


app.listen(port,()=>{
    console.log(`Server running on the port ${port}`); 
})
