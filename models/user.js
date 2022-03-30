const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    password: String,
    phone: String,
    email: String,
    userType: String
})

module.exports = mongoose.model("User", userSchema)