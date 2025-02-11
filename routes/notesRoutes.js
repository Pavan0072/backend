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

/**
 * @swagger
 * tags:
 *  name : notes
 *  description : all the api routes related to notes
 * 
 * 
 */
/**
 * @swagger
 * /notes:
 *      get:
 *       summary : get all notes
 *       tags : [notes]
 *       responses:
 *          200:
 *              description: list of all success.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type : array
 *                          items :
 *                              type : object
 *          400:
 *              description: incorrect request
 *
 */
/**
 * @swagger
 * /notes/create:
 *          post:
 *            summary: Create a new note
 *            tags: [notes]
 *            description: Adds a new note to the database. Requires a valid JWT token.
 *            security:
 *              - BearerAuth: []  # This requires authentication
 *            requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      title:
 *                        type: string
 *                        example: "My New Note"
 *                      content:
 *                        type: string
 *                        example: "This is the content of my note."
 *                      authorId:
 *                        type: string
 *                        example: "user12345"
 *            responses:
 *              200:
 *                description: Note successfully created.
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: string
 *                      example: "notes has been added"
 *              401:
 *                description: Unauthorized - Invalid or missing token.
 *              500:
 *                description: Internal Server Error.
 */


noteRouter.get("/blogs",async(req,res)=>{
    try{
        const blogs=await NoteModel.find({authorId:req.body.authorId})
        res.send(blogs)
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Internal Server Error" });
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