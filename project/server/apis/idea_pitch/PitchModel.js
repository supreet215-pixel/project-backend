const mongoose = require ("mongoose")

const pitchSchema = new mongoose.Schema(
    {
        ownerId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        title:{type:String},
        description:{type:String},
        category:{type:mongoose.Schema.Types.ObjectId, ref:"category"},
        pitchVideoUrl:{type:String},
        targetAmount:{type:String},
        currentAmount:{type:String},
        aiScore:{type:String},
        status:{type:Boolean},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("pitch",pitchSchema)
