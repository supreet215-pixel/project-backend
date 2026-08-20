const mongoose = require ("mongoose")

const invProfileSchema = new mongoose.Schema(
    {
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        investorProfileId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        country:{type:String},
        kycStatus:{type:String},
        riskPreference:{type:String},
        created_at:{type:Date}
    }
)

module.exports = mongoose.model("invProfile",invProfileSchema)

