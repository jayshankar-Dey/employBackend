const getfile = require("../config/dataUri");
const Users = require("../models/user.model");
const UsersModel = require("../models/users.model");
const cloudinary = require('cloudinary')
const userRegisterController = async(req, res) => {
    try {
        const { name, email, password } = req.body.values
        if (name && email && password) {
            const exist = await Users.findOne({ email: email })
            if (exist) {
                res.status(400).json({
                    success: false,
                    message: `email alrady register please login`
                });
            } else {
                await Users.create({ name, email, password })
                res.status(200).json({
                    success: true,
                    message: `${name} register succesfully`
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: `${name} please provide all fileds`
            });
        }
    } catch (error) {
        console.log(`eror in register controller ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `register failed`
        });
    }
}
const userLoginController = async(req, res) => {
    try {
        const { email, password } = req.body.values
        const user = await Users.findOne({ email: email })
        if (!user) {
            res.status(400).json({
                success: false,
                message: `email doesnot exiest`
            });
        }
        const compare = await user.comparePassword(password)
        if (!compare) {
            res.status(400).json({
                success: false,
                message: `email and password not match`
            });
        }
        const token = await user.genarateToken()
        res.status(200).json({
            success: true,
            message: "user login succesfully",
            token
        });
    } catch (error) {
        console.log(`eror in login controller ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `Login failed`
        });
    }
}

//get user data
const getuserdata = async(req, res) => {
        try {
            const user = await Users.findById(req.user)
            res.status(200).json({
                success: true,
                message: `get user `,
                user
            });
        } catch (error) {
            console.log(`eror in getuser controller ${error}`.bgRed)
            res.status(400).json({
                success: false,
                message: `get user failed`
            });
        }
    }
    //add user data
const addusers = async(req, res) => {
        try {
            const { name, address } = req.body
            if (!name || !address || !req.file) {
                return res.status(200).json({
                    success: true,
                    message: `plese provide all fields`,
                });
            }
            const file = getfile(req.file)
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            const image = {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }
            await UsersModel.create({ name, address, image, user: req.user })
            res.status(200).json({
                success: true,
                message: `${name} add succesfully `,
            });
        } catch (error) {
            console.log(`eror in addUsers controller ${error}`.bgRed)
            res.status(400).json({
                success: false,
                message: `addUsers user failed`
            });
        }
    }
    ///getusers
const getUsers = async(req, res) => {
    try {
        const { search } = req.params
        const serchdata = search ? {
            $and: [{ user: req.user }, {
                name: { $regex: search }
            }]
        } : { user: req.user }
        const users = await UsersModel.find(serchdata).sort("name")
        res.status(200).json({
            success: true,
            message: `get user `,
            users
        });
    } catch (error) {
        console.log(`eror in getuser controller ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `get user failed`
        });
    }
}

//get user by id
const get_Single_UserById = async(req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const user = await UsersModel.findById(id)
        res.status(200).json({
            success: true,
            message: `get user `,
            user
        });
    } catch (error) {
        console.log(`eror in getuser controller ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `get user failed`
        });
    }
}

const Update_Single_User = async(req, res) => {
    try {
        const { id } = req.params
        const { name, address } = req.body

        const user = await UsersModel.findById(id)
        if (name) user.name = name
        if (address) user.address = address
        if (req.file) {
            const file = getfile(req.file)
            await cloudinary.v2.uploader.destroy(user.image.public_id)
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            user.image = {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }
        }
        await user.save()
        res.status(200).json({
            success: true,
            message: `get user `,
            user
        });
    } catch (error) {
        console.log(`eror in getuser controller ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `get user failed`
        });
    }
}
const delete_Single_UserById = async(req, res) => {
    try {
        const { id } = req.params
        const user = await UsersModel.findById(id)
        await cloudinary.v2.uploader.destroy(user.image.public_id)
        await UsersModel.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: `delete succesfully `,
        });
    } catch (error) {
        console.log(`eror in delete controller ${error}`.bgRed)
        res.status(400).json({
            success: false,
            message: `delete user failed`
        });
    }
}
module.exports = {
    userRegisterController,
    userLoginController,
    getuserdata,
    addusers,
    getUsers,
    get_Single_UserById,
    Update_Single_User,
    delete_Single_UserById
}