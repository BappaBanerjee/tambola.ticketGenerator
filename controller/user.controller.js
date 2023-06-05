const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { validate } = require("../utils/email.validator");
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields (username, email, password) are required");
    }

    const validEmail = validate(email);
    if (!validEmail) {
        res.status(400);
        throw new Error("Invalid EmailID. Please pass a valid emailId");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email address already register, please login");
    }
    if (password.length < 8) {
        res.status(400);
        throw new Error("Password length must be greater than equal to 8 characters");
    }
    const hashPassWord = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashPassWord
    });
    if (user) {
        res.status(200).json({
            msg: "account sucessfully created",
            id: user.id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("user data not valid");
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Email or password is required");
    }
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id
            }
        }, process.env.JWTSECRETKEY,
            { expiresIn: "30m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("email or password is invalid");
    }
})

//test api
const info = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports.user = {
    register,
    login,
    info
}