const { Router } = require('express');
const userRouter = Router();
const { userModel, puchaseModel, courseModel } = require("../db");

const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    await userModel.create({
        email,
        password,
        firstName,
        lastName
    });
    res.json({
        message : "Signed up successfully"
    });
})

userRouter.post("/signin", async (req, res) => {
    const {email, password } = req.body;
    const user = await userModel.findOne({
        email,
        password
    })
    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);
        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({message: "Incorrect Credentials"})
    }
})

userRouter.get("/purchases", (req, res) => {
})

module.exports = {
    userRouter: userRouter
}