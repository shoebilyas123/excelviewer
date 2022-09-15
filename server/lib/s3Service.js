const { S3 } = require("aws-sdk");

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESSKEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const Bucket = process.env.AWS_BUCKET_NAME;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

exports.s3uploadV2 = async (file) => {
  const param = {
    Bucket,
    Key: `${file.originalname}`,
    Body: file.buffer,
  };

  console.log(param, region, accessKeyId, secretAccessKey);

  return await s3.upload(param).promise();
};

exports.list = async () => {
  return await s3.listObjectsV2({ Bucket }).promise();
};

exports.download = async (Key) => {
  return await s3.getObject({ Bucket, Key }).promise();
};
