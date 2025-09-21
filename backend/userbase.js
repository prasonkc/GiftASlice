const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog