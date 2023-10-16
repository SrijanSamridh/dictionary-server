const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 6,
        max : 255,
        trim: true,
        unique : true
    },
    email: {
        type : String,
        required : true,
        trim: true,
        validate : {
            validator : function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message : props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type : String,
        required : true,
        min : 6,
        max : 1024,
        trim: true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', userSchema);