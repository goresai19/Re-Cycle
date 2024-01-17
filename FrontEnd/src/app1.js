const express =require('express');
const collection = require('./mongo')
const cors =require("cors")
const app =express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
    const{username,password}=req.body

    try{
       const check= await collection.fineOne({email:email})
        
       if(check){
        res.json("Username already exist")
       }
       else{
        res.json("This is a valid Username")
       }
    }
    catch{
      res.json("Not Exist")
    }
})

app.post("/sign_up",async(req,res)=>{
    const{username,password}=req.body
    const data={
        username:username,
        password:password
    }

    try{
       const check= await collection.fineOne({username:username})
        
       if(check){
        res.json("Username already exist")
       }
       else{
        res.json("This is a valid Username")
        await collection.insertMany([data])
       }
    }
    catch{
      res.json("Not Exist")
    }
})

app.listen(8000,()=>
{
    console.log("Port connected")
})