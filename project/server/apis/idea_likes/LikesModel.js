const mongoose = require ("mongoose")

const likesSchema = new mongoose.Schema(
    {
     
        ideaId:{type:mongoose.Schema.Types.ObjectId, ref:"media"},
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("likes",likesSchema)

