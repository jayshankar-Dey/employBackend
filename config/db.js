const mongoose = require('mongoose')

const connectDB = async() => {
    await mongoose.connect(process.env.db).then(() => {
        console.log("database connected succesfully".bgBlue)
    }).catch((err) => {
        console.log(`error in mongodconnection ${err}`.bgRed)
    })
}
module.exports = connectDB