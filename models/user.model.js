const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
        const user = this
        if (!user.isModified('password')) next()
        user.password = await bcrypt.hash(user.password, 10)
    })
    //genarate token
userSchema.methods.genarateToken = function() {
        return jwt.sign({ id: this._id }, process.env.jwt_secret, {
            expiresIn: "30d"
        })
    }
    //compare pasword
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password)
}
const Users = mongoose.model("Users", userSchema)
module.exports = Users