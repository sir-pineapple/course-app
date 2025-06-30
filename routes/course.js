const { Router } = require('express');
const courseRouter = Router();
const { purchaseModel, courseModel } = require("../db");

courseRouter.post("/purchase", (req, res) => {
})

courseRouter.get("/preview", async (req, res) => {
    const courses = await courseModel.find({});
    res.json({
        courses: courses
    })
})

module.exports = {
    courseRouter: courseRouter
}