const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config({});

const fileRoutes = require("./routes/file");
const app = express();

app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Excel viewer server running on PORT:${PORT}...`);
});

app.use("/api/v1/file", fileRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res
        .status(400)
        .json({ message: "Please upload a csv or xlsx file." });
    }
  }
});
