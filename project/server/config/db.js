const mongoose = require ("mongoose")

mongoose.connect("mongodb://localhost:27017/myProject").then(()=>{
    console.log("Database Connected!")
}).catch((err)=>{
    console.log("Error in Database",err)
})
