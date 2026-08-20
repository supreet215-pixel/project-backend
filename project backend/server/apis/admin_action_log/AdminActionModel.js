const mongoose = require ("mongoose")

const adminActionSchema = new mongoose.Schema(
    {
        actionId:{type:mongoose.Schema.Types.ObjectId, ref:"admin"},
        ideaId:{type:mongoose.Schema.Types.ObjectId, ref:"media"},
        adminId:{type:mongoose.Schema.Types.ObjectId, ref:"admin"},
        actionType:{type:String},
        reason:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("admin",adminActionSchema)

