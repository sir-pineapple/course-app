const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const  { adminMiddleware } = require("../middleware/admin");

const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require("../config");

const bcrypt = require('bcrypt');

adminRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await adminModel.create({
        email,
        password: hash,
        firstName,
        lastName
    });
    res.json({
        message : "Signed up successfully"
    });
})

adminRouter.post("/signin", async (req, res) => {
    const {email, password } = req.body;
    const admin = await adminModel.findOne({
        email
    })
    if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        if (match) {
            const token = jwt.sign({
                id: admin._id
            }, JWT_ADMIN_PASSWORD);
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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId
    })
    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;
    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title,
        description,
        imageUrl,
        price
    })
    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/all", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    });
    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}