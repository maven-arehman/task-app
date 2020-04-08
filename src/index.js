const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

//express automatically parse json to object
app.use(express.json());

//register the routers
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

//Lecture 133
