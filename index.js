const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const mongoose = require('mongoose');

require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
    await mongoose.connect(mongoURI);
    app.listen(port);
}

main();