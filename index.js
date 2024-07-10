const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express(); // Initialize app here

const userRouter = require("./routes/userRouter");

app.use(express.json());
const port = 3000;

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded




// routes 
app.use("/users", userRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
