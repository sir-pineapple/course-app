const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require("../db");

const jwt = require('jsonwebtoken');
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    });
    res.json({
        message : "Signed up successfully"
    });
})

adminRouter.post("/signin", async (req, res) => {
    const {email, password } = req.body;
    const user = await adminModel.findOne({
        email,
        password
    })
    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({message: "Incorrect Credentials"})
    }
})

adminRouter.post("/course", (req, res) => {
})

adminRouter.put("/course", (req, res) => {
})

adminRouter.get("/course/all", (req, res) => {
})

module.exports = {
    adminRouter: adminRouter
}