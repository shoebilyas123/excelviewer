const express = require("express");
const {
  uploadFile,
  listFiles,
  downloadFile,
} = require("../controllers/fileController");
const multer = require("multer");
const { MulterError } = require("multer");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "text/csv"
  ) {
    cb(null, true);
  } else cb(new MulterError("LIMIT_UNEXPECTED_FILE"), false);
};
const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/list", listFiles);
router.get("/download/:filename", downloadFile);
module.exports = router;
