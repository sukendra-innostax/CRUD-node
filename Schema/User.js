const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        default: ''
    },
    age: {
        type: Number, 
        default: 0
    },
    gender: {
        type: String, 
        default: ''
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
