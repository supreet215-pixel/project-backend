const mongoose = require ("mongoose")

const categorySchema = new mongoose.Schema(
    {
       
        userId:{type:mongoose.Schema.Types.ObjectId, ref:"users"},
        categoryName:{type:"String"},
        description:{type:"String"},
        image:{type:"String"},
        status:{type:Boolean},
    },
    {timestamps:true}
)

module.exports = mongoose.model("category",categorySchema)