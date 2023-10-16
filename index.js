const express = require("express");
const { connectDatabase } = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
connectDatabase();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://dictionary-server-six.vercel.app",
      "https://dictionary.srijansamridh.tech",
      "http://127.0.0.1:5500", // Add your local origin
    ],
    credentials: true,
  })
);

app.set("x-powered-by", false); // Corrected the typo
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const authRouter = require("./src/routes/auth");
app.use(authRouter);

// port
const port = process.env.PORT || 8080; // Ensure that PORT is set in your environment variables
app.listen(port, () => {
  console.log(`Dictionary app listening at http://localhost:${port}`);
});
