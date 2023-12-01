const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const s3 = new aws.S3();

const {
  S3_BUCKET,
  S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY,
  REGION,
} = require("../common");

//* aws region 및 자격증명 설정
AWS.config.update({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: REGION,
});

const upload = multer({
  //* 저장공간
  // s3에 저장
  storage: multerS3({
    // 저장 위치
    s3: new AWS.S3(),
    bucket: S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key(req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`); // original 폴더안에다 파일을 저장
    },
  }),
  //* 용량 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
