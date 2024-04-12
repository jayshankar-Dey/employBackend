const express = require('express');
const {
    userRegisterController,
    userLoginController,
    getuserdata,
    addusers,
    getUsers,
    get_Single_UserById,
    Update_Single_User,
    delete_Single_UserById
} = require('../controllers/user.controller');
const isauth = require('../middlewire/isauth');
const singleUplode = require('../middlewire/singleUplode');

const router = express.Router();
router.post('/register', userRegisterController)
router.post('/login', userLoginController)
router.get('/auth', isauth, getuserdata)
router.post('/addUser', isauth, singleUplode, addusers)
router.get('/getUser/:search?', isauth, getUsers)
router.get('/getSingleUser/:id', isauth, get_Single_UserById)
router.post('/update/:id', isauth, singleUplode, Update_Single_User)
router.delete('/delete/:id', isauth, delete_Single_UserById)
module.exports = router