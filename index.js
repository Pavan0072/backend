const express=require("express")

const {connection}=require("./config/db")

const{userRouter}=require("./routes/userRoutes")
const{noteRouter}=require("./routes/notesRoutes")
const jwt=require("jsonwebtoken")
require('dotenv').config();
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');




const app=express();
app.use(cors())

app.use(express.json())
const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'learning api development',
        version: '1.0.0',
      },
      servers: [
        {
          url: "http://localhost:9988", // Change this based on your environment
        },
      ],

    },
    apis: ['./routes/notesRoutes.js'], // files containing annotations as above
};
  
const Specification = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(Specification));

app.use("/users",userRouter)
app.use(auth)

app.use("/notes",noteRouter)



app.get("/movies",(req,res)=>{
    // const token=req.headers.authorization.split(" ")[1];
    // console.log(token)
    // jwt.verify(token,"secret",(error,decoded)=>{
    //     if(decoded){
    //         res.send("movie data")
    //     }
    //     else{
    //         res.send("unauthorizad")
    //     }
    // })
    res.send("movie data")
})



app.listen(process.env.port,async()=>{
    try{
        await connection

        console.log("you are now connected to database")


    }catch(error){
        console.log(error)
    }
    console.log("server is up and running on port 9988")
})