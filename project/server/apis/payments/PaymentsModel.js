const mongoose = require ("mongoose")

const paymentsSchema = new mongoose.Schema(
    {
        paymentId:{type:String},
        investmentId:{type:String},
        amount:{type:String},
        paymentMethod:{type:String},
        transactionId:{type:String},
        paymentStatustatus:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("payments",paymentsSchema)



