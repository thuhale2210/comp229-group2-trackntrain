const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Trainer = new Schema({ 
    firstName: {
        type:String
    },
    lastName:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
});


module.exports = mongoose.model('Trainer',Trainer);