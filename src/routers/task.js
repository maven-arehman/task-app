const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    //1st method
    // const tasks = await Task.find({ owner: req.user._id });

    //2nd method
    //this is via relationship query/setup
    // await req.user.populate("tasks").execPopulate();

    //3rd method
    const match = {};
    const sort = {};

    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  // to check not to update _id field
  const updates = Object.keys(req.body);
  const notAllowedUpdates = ["_id"];
  const isInValidOperation = updates.some((update) =>
    notAllowedUpdates.includes(update)
  );

  if (isInValidOperation) {
    res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
