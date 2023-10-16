const express = require("express");
const { connectDatabase } = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();
connectDatabase();

const app = express();
app
  .set("x-powered-by", false)
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const authRouter = require("./src/routes/auth");
app.use(authRouter);

// port
const port = Number(process.env.PORT); // process.env.PORT has been Typecasted to Number

app.listen(port, () => {
  console.log(`Dictionary app listening at http://localhost:${port}`);
});
