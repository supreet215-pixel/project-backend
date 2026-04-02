const mongoose = require ("mongoose")

const commentsSchema = new mongoose.Schema(
    {
       
        ideaId:{type:mongoose.Schema.Types.ObjectId, ref:"media"},
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        commentText:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("comments",commentsSchema)


