const mongoose=require("mongoose");
 
const UserSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:String,
    name:String,
    age:Number
})


const UserModel=mongoose.model("flmuser",UserSchema);

module.exports={
    UserModel
}