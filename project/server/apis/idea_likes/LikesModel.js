const mongoose = require ("mongoose")

const likesSchema = new mongoose.Schema(
    {
     
        ideaId:{type:String},
        userId:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("likes",likesSchema)

