const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
    },
    password: {
        type: String, 
        required: true,
    
    },
    verified: {
        type: Boolean,
        default: false,
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'imageCollection'
    }]
}, { supressReservedKeysWarning: true } );
const User = mongoose.model("User", userSchema)

module.exports = User;
