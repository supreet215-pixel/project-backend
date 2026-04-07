const mongoose = require ("mongoose")

const mediaSchema = new mongoose.Schema(
    {
      
        ideaId:{type:mongoose.Schema.Types.ObjectId, ref:"media"},
        mediaUrl:{type:String},
        mediaType:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("media",mediaSchema)



