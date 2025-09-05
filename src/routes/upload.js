const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");

const router = express.Router();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("file"), (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: Date.now() + "_" + req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json({ url: data.Location });
  });
});

module.exports = router;
 