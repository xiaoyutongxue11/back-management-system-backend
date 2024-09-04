const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// multer是一个node.js的插件，用于处理mutipart/form-data类型的表单数据，主要用于文件时上传
const multer = require("multer");
const upload = multer({ dest: "./public/upload" });
app.use(upload.any());
app.use(express.static("./public"));

const bodyParser = require("body-parser");
// 当extended为false时，req.body只能解析application/x-www-form-urlencoded（数组/字符串）格式的数据，为true时，可以解析application/json（任意）格式的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // status默认为1，表示失败，为0表示成功
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// const jwtConfig = require("./jwt_config/index");
// // 安装express-jwt用于解析token
// const { expressjwt: jwt } = require("express-jwt");
// app.use(
//   jwt({
//     secret: jwtConfig.jwtSecretKey,
//     algorithms: ["HS256"],
//   }).unless({
//     // 忽略以/api为开头的路由（登录注册路由），原因：token是登录之后才生成的
//     path: [/^\/api\//],
//   })
// );

const loginRouter = require("./router/login");
app.use("/api", loginRouter);
const userRouter = require("./router/userInfo");
app.use("/user", userRouter);

const Joi = require("joi");
// 对不符合joi校验规则的情况进行报错
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.cc(err);
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
