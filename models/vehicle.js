const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    description: String,
    uniqueId: String
})

module.exports = mongoose.model("Vehicle", vehicleSchema)