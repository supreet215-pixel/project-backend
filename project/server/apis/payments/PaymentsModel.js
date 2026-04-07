const mongoose = require ("mongoose")

const paymentsSchema = new mongoose.Schema(
    {
        paymentId:{type:mongoose.Schema.Types.ObjectId, ref:"payments"},
        investmentId:{type:mongoose.Schema.Types.ObjectId, ref:"investments"},
        amount:{type:String},
        paymentMethod:{type:String},
        transactionId:{type:mongoose.Schema.Types.ObjectId, ref:"payments"},
        paymentStatus:{type:Boolean},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("payments",paymentsSchema)



