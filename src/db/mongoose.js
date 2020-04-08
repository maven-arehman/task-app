const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
