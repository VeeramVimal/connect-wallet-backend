const { successResponse, errorResponse } = require("../helpers");
const { authServices, tokenServices } = require("../services");

const register = async (req, res) => {
    try {
        var token = null;
        const user = await authServices.registerServces(req.body);
        if(user.message == "user register Successfully") token = await tokenServices.generateAuthToken(user); 
        // return successResponse(req, res, {user: {message: 'user register Successfully'}})
        return successResponse(req, res, {user: user, token});

    } catch (error) {
        return errorResponse(req, res, error.message);  
    }
};

const login = async (req, res) => {
    try {
        const user = await authServices.loginServices(req.body);
        const token = await tokenServices.generateAuthToken(user);
        return successResponse(req, res, {user: {message: 'user login Successfully'}, token})
    } catch (error) {
        return errorResponse(req, res, error.message);  
    }
}
module.exports = {
    register,
    login
}