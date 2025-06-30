const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URI } = require("./config");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    await mongoose.connect(MONGO_URI);
    app.listen(port);
}

main();