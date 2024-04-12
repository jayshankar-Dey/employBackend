const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"]
    },
    address: {
        type: String,
        required: [true, "Username is required"]
    },
    image: {
        public_id: {
            type: String
        },
        url: {
            type: String
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }
}, { timestamps: true })


const UsersModel = mongoose.model("UsersModel", UsersSchema)
module.exports = UsersModel