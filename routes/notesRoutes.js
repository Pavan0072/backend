const {NoteModel}=require("../models/NoteSchema")
const express=require("express")
const jwt=require("jsonwebtoken")

const noteRouter=express.Router()

noteRouter.post("/create",async(req,res)=>{

    try{
        const note=new NoteModel(req.body)
        await note.save()
        res.send("notes has been added")
    }
    catch(err){
        console.log(err)
        res.send("error at notes")

    }

})

noteRouter.get("/blogs",async(req,res)=>{
    try{
        const blogs=await NoteModel.find({authorId:req.body.authorId})
        res.send(blogs)
    }
    catch(err){
        console.log(err)
    }
    
})
noteRouter.delete("/delete/:ID",async(req,res)=>{
    const id=req.params.ID
    const authorId=req.body.authorId
    const note=await NoteModel.findOne({_id:id})
    console.log(note)
    
    try {
        // Find the user by ID and delete the document

        if(note.authorId===authorId){
            const blog = await NoteModel.findByIdAndDelete(id);
            console.log(blog)
    
        // If no user is found, return a 404 error
        if (!blog) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        // If the user is deleted successfully, return a success message
        return res.status(200).json({ message: 'User deleted successfully' });
            
        }
        else{
            res.send("user not authorized")
        }
        
    } 
    catch (err)
    {
        console.error('Error deleting user:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
})

// to update data based on given id
noteRouter.patch("/update/:ID",async(req,res)=>{
    const id=req.params.ID
    const authorId=req.body.authorId
    const note=await NoteModel.findOne({_id:id})
    console.log(note)

    try{
        if(note.authorId===authorId){
            if(id){
                const blogs=await NoteModel.findByIdAndUpdate(id,req.body,{new:true})
                console.log(`id:${id} data:${blogs}`)
                if(blogs){
                res.send(`user has updated`).status(200)
                }
                else{
                res.send(`user not found`).status(400)
    
                }
            }
            else{
                res.send("you are not authoraized")
                console.log("you are not authoraized")

            }
        }
        else{
            res.send("you are not authoraized")
            console.log("you are not authoraized")
        }
           
    }
    catch(err){
        res.send(`error updating user ${err}`).status(500)
    }
    
})

module.exports={
    noteRouter
}