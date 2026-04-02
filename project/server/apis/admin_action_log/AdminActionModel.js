const mongoose = require ("mongoose")

const adminActionSchema = new mongoose.Schema(
    {
        actionId:{type:String},
        ideaId:{type:String},
        adminId:{type:String},
        actionType:{type:String},
        reason:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("adminAction",adminActionSchema)

