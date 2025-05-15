const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required:true },
    cus_details: { type: Object, required:true },
    ship_details: { type: Object, required:true },
    tran_id: { type: String, required:true },
    val_id: { type: String, required:true },
    delivery_status: { type: String, default:'pending' },
    payment_status: { type: String, default:'pending' },
    total: { type: Number, required:true },
    vat: { type: Number, default:0 }
}, {
    timestamps:true,
    versionKey:false
})

const InvoiceModel = mongoose.model('invoice', DataSchema);
export default InvoiceModel;