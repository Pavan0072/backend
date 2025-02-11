
const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    console.log(token)
    if(token){
    try{
    //console.log(token)
    jwt.verify(token,"secret",(error,decoded)=>{
        if(decoded){
            console.log(decoded)
            req.body.authorId=decoded.authorId;
            //req.body.authorName=decoded.authorName;

            next()
            console.log("authentication successful")
        }
        else{
            res.send("unauthorizad")
        }
    })

    }catch(error){
        res.send({"error":error})

    }
}else{
    res.send("enter correct token")
}
}

module.exports={
    auth
}

