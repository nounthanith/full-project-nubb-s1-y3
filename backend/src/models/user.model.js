const { default: mongoose } = require("mongoose");


const userShcema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "delivery", "manager", "inventory_manager", "customer"],
        default: "customer"
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", userShcema)

module.exports = UserModel
