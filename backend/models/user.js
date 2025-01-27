const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
        },
        lastname:{
            type: String
        }        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    socketId: String
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;