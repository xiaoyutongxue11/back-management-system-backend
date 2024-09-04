// 加密中间件
const bcrypt = require("bcryptjs");
const db = require("../db/index");
const crypto = require("crypto");
const fs = require("fs");

// 上传头像
exports.uploadAvatar = (req, res) => {
  const onlyId = crypto.randomUUID();
  const oldName = req.files[0].filename;
  const newName = Buffer.from(req.files[0].originalname, "latin1").toString(
    "utf8"
  );
  const image_url = `http://127.0.0.1:3000/upload/${newName}`;
  fs.renameSync("./public/upload/" + oldName, "./public/upload/" + newName);
  const sql = "insert into image set ?";
  db.query(
    sql,
    {
      image_url,
      onlyId,
    },
    (err, result) => {
      if (err) return res.cc(err);
      res.send({
        status: 0,
        onlyId,
        url: image_url,
      });
    }
  );
};
