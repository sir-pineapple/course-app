const { Router } = require("express");
const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
})

adminRouter.post("/signin", (req, res) => {
})

adminRouter.post("/course", (req, res) => {
})

adminRouter.put("/course", (req, res) => {
})

adminRouter.gett("/course/all", (req, res) => {
})

module.exports = {
    adminRouter: adminRouter
}