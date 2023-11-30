// const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId
// const orderSchema = new mongoose.Schema({
//     shipping_details: {
//         customerName: String,
//         customerEmail: String,
//         customerPhone: String,
//         customerCity: String,
//         customerUpzilla: String,
//         customerAddress: String,
//         customerZip: String
//       },
//     cartItems : [
//         {
//             id :{
//                 tyep : ObjectId
//             },
//             itemsId : {
//                 type : ObjectId
//             },
//             ItemsName : {
//                 type : String
//             },
//             itemsPrice : {
//                 type : Number
//             },
//             qunatitys : {
//                 type:  String
//             }
            
//         }
//     ],
//     shipping_cost: Number,
//     bill: Number
// },{
//     timestamps: true
// })
// const Order = mongoose.model('Order',orderSchema)
// module.exports = Order  


const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    shipping_details: {
        customerName: String,
        customerEmail: String,
        customerPhone: String,
        customerCity: String,
        customerUpzilla: String,
        customerAddress: String,
        customerZip: String
    },
    cartItems: [
        {
            id: {
                type: ObjectId
            },
            itemsId: {
                type: ObjectId
            },
            itemsName: {  
                type: String
            },
            itemsPrice: {
                type: Number
            },
            qunatitys: { 
                type: String
            }
        }
    ],
    shipping_cost: Number,
    bill: Number
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
