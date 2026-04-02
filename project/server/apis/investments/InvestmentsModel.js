const mongoose = require ("mongoose")

const investmentsSchema = new mongoose.Schema(
    {
        investmentId:{type:String},
        ideaId:{type:String},
        investorId:{type:String},
        amount:{type:String},
        equityPercent:{type:String},
        status:{type:Boolean},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("investments",investmentsSchema)

