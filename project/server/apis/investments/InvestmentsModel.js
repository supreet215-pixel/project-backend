const mongoose = require ("mongoose")

const investmentsSchema = new mongoose.Schema(
    {
        investmentId:{type:mongoose.Schema.Types.ObjectId, ref:"investments"},
        ideaId:{type:mongoose.Schema.Types.ObjectId, ref:"media"},
        investorId:{type:mongoose.Schema.Types.ObjectId, ref:"invProfile"},
        amount:{type:String},
        equityPercent:{type:String},
        status:{type:Boolean},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("investments",investmentsSchema)

