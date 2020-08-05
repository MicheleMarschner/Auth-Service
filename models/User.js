const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //which name? username? or first? what is the validation?
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    role: {
        type: String,
        //which roles do we have? admin? caretaker?
        enum: ['user', 'publisher'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    //do we want to have that as well?
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
    

module.exports = mongoose.model('User', UserSchema);