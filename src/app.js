const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

//express automatically parse json to object
app.use(express.json());

//register the routers
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
