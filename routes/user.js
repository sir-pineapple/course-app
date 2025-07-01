const { Router } = require('express');
const userRouter = Router();
const { userModel, puchaseModel, courseModel, purchaseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");

const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require("../config");

const bcrypt = require('bcrypt');

userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await userModel.create({
        email,
        password: hash,
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
        email
    })
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({
                id: user._id
            }, JWT_USER_PASSWORD);
            res.json({
                token: token
            })
        }
        else {
            res.status(403).json({
                message: "Incorrect Credentials"
            })
        }
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const purchases = await purchaseModel.find({
        userId
    })
    let purchasedCourseIds = [];
    for (let i=0; i<purchases.length; i++) {
        purchasedCourseIds.push(purchases[i].courseId)
    }
    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })
    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}