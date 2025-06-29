const express = require('express');
const app = express();
const port = 3000;

const jwt = require('jsonwebtoken');
const JWT_SECRET = "";

app.get("/", (req, res) => {
})

app.post("/user/signup", (req, res) => {
})

app.post("/user/signin", (req, res) => {
})

app.get("/courses", (req, res) => {
})

app.get("/user/purchases", (req, res) => {
})

app.post("/course/purchase", (req, res) => {
})

app.listen(port);