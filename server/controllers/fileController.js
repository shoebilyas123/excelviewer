const { s3uploadV2, list, download } = require("../lib/s3Service");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    console.log({ F: req.body.file });
    console.log({ file });
    const result = await s3uploadV2(file);
    console.log({ result });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.listFiles = async (req, res) => {
  try {
    const result = await list();
    const data = result.Contents.map((item) => item.Key);
    console.log(data);
    res.status(200).json({ data });
  } catch (error) {
    res.status(error.statusCode || 500).json(error);
  }
};

exports.downloadFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const result = await download(filename);
    console.log(result);
    res.status(200).json({ data: result.Body });
  } catch (error) {
    res.status(error.statusCode || 500).json(error);
  }
};
