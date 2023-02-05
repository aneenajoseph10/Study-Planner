const mongoose = require('mongoose');
var schema= new mongoose.Schema({
    assessment:{
        type:String,
        required:true
    },
    date:{
        type:String
    },
    description:{
        type:String
    },
    mark:{
        type:String
    },
    grade:{
        type:String
    }
})
const Userdb= mongoose.model('userdb',schema);
module.exports=Userdb;