const mongoose = require ("mongoose")

const updateSchema = new mongoose.Schema(
    {
        updateId:{type:String},
        ideaId:{type:String},
        updateText:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("update",updateSchema)
