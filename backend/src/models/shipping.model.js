const mongoose = require("mongoose");

const shippingSchema = mongoose.Schema({
    // THE ITEM
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, "Please specify the item category"]
    },

    // SENDER DETAILS
    sender: {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },

    // RECIPIENT DETAILS
    recipient: {
        name: { type: String, required: true, trim: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },

    // SHIPPING SPECIFICS
    weight: { type: Number, default: 1 }, // kg
    shippingCost: { type: Number, required: true },
    
    status: {
        type: String,
        enum: ['Pending', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Returned'],
        default: 'Pending'
    },

    trackingNumber: {
        type: String,
        unique: true,
        default: () => `SHP-${Math.random().toString(36).toUpperCase().substring(2, 10)}`
    }
}, { 
    timestamps: true 
});

const Shipping = mongoose.model("Shipping", shippingSchema)

module.exports = Shipping