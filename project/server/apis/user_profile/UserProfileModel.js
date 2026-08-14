const mongoose = require ("mongoose")

const userProfileSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        // name:{type:String},
        country:{type:String},
        occupation:{type:String},
        address:{type:String},
        contact:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("userProfile",userProfileSchema)
