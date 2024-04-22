const user = require('../models/user.model')
const errorHandler = require('../utils/error')
const bcrypt = require('bcrypt')



async function updateuser(req, res, next) {
    const userIdFromUrl = req.params.userId;
    const userIdFromJwt = req.user.id;

    if (userIdFromJwt !== userIdFromUrl) {
        return next(errorHandler(403, "You are not allowed to do that"));
    }

    const { username, email, password, photo } = req.body;

    try {
        // Construct the updateFields object with any provided fields
        let updateFields = {};

        if (username !== undefined) {
            if (username.length < 6 || username.length > 20 || username.includes(' ')) {
                return next(errorHandler(400, "Invalid username format"));
            }
            updateFields.username = username;
        }

        if (email !== undefined) {
            updateFields.email = email;
        }

        if (password !== undefined) {
            if (password.length < 6) {
                return next(errorHandler(400, "Password must be at least 6 characters"));
            }
            const hashPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashPassword;
        }

        if (photo !== undefined) {
            updateFields.photo = photo;
        }

        // Find and update the user document with the updateFields object
        const updatedUser = await user.findByIdAndUpdate(userIdFromUrl, { $set: updateFields }, { new: true });

        // Omitting the password from the response
        const { password: omit, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}



async function deleteUser(req, res, next) {
    const userIdFromUrl = req.params.userId;
    const userIdFromJwt = req.user.id;
    if (userIdFromJwt !== userIdFromUrl) {
        return next(errorHandler(403, 'Frobidden! You are not allowded to do that'))
    }
    try {
        await user.findByIdAndDelete(userIdFromUrl)
        await res.status(200).json('user has been Deleted Sucessfully')
    } catch (error) {
        next(error)
    }

}
async function signOut(req,res){
res.clearCookie('access_token').status(200).json("User Signout is sucess")
}


module.exports = { updateuser, deleteUser,signOut }