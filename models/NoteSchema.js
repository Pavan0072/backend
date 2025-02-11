const mongoose=require("mongoose");
 
const NoteSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:String,
    author:String,
    category:Number,
    authorId:{type:String}
},
{
    versionKey:false,
})


const NoteModel=mongoose.model("notes",NoteSchema);

module.exports={
    NoteModel
}