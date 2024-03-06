const mongoose = require('mongoose')

const loginModel = new mongoose.Schema({
    username: String,
    mobile: String,
    Email: String,
    password: String,
    createprofilefor:String,
    gender:String
})
const loginSchema = mongoose.models.userregisterDetails || mongoose.model("userregisterDetails",loginModel)
module.exports = loginSchema