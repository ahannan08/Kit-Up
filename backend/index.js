
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./Routes/Routes.js"
import bodyParser from "body-parser";
import { mongoURI, port } from "./config.js"; // Import configuration



const app = express()


//middlewares
app.use(cors())
app.use(express.json())


//routes
app.use("/auth", router)


//mongoose
mongoose.connect(mongoURI)

//port
app.listen(port, (req,res)=>{
    console.log("connected to port")
})