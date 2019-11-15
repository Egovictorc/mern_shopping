const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    register_date: {
        default: Date.now,
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = UserModel = mongoose.model("user", UserSchema)