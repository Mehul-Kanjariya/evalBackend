const express = require("express");
require("dotenv").config();
const {connection}=require("./db");
const {userRouter}=require("./routes/user.routes");
const {auth}=require("./middleware/auth.middleware");
const {postRouter}=require("./routes/posts.routes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors())
app.use("/users",userRouter);
app.use(auth);
app.use("/posts",postRouter);


app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to mongo")
    }catch(err){
        console.log(err.message)
    }
    console.log(`Server is running at port ${process.env.port}`)
})