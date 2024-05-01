import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "fullname" : {
        type : String,
        required : true
    },
    "username": {
        type : String,
        required : true,
        minlength: 5,
        maxlength : 30,
        unique: true
    },
    "password" : {
        type : String,
        required : true,
    },
    "profilePic" : {
        type: String,
        default : ""
    } 
})

const User = mongoose.model('User', UserSchema);

export default User;
