const mongoose = require ("mongoose")

const pitchSchema = new mongoose.Schema(
    {
        ownerId:{type:String},
        ideaId:{type:String},
        title:{type:String},
        description:{type:String},
        category:{type:String},
        pitchVideoUrl:{type:String},
        targetAmount:{type:String},
        currentAmount:{type:String},
        aiScore:{type:String},
        status:{type:Boolean},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("pitch",pitchSchema)
