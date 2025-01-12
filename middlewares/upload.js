const multer = require("multer");
const path = require("path");
const tempDir = path.join("/", "tmp");
// console.log(tempDir);

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (_id, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
