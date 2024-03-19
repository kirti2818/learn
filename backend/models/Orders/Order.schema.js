const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    approved : {
        type : Boolean ,
        default : null
    },
    quantity : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
})

const OrderModel = mongoose.model("order",OrderSchema)
module.exports = OrderModel;