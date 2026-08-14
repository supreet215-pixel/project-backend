const mongoose = require ("mongoose")

const usersSchema = new mongoose.Schema(
    { 
        name:{type:String},
        email:{type:String},
        password:{type:String},
        userType:{type:String},  //admin-1 invester-2 user-3
        status:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("users",usersSchema)


