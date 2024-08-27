const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
// 当extended为false时，req.body只能解析application/x-www-form-urlencoded（数组/字符串）格式的数据，为true时，可以解析application/json（任意）格式的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwtConfig = require("./jwt_config/index");
// 安装express-jwt用于解析token
const { express: jwt } = require("express-jwt");
app.use(
  jwt({
    secret: jwtConfig.jwtSecretKey,
    algorithms: ["HS256"],
  }).unless({
    // 忽略以/api为开头的路由（登录注册路由），原因：token是登录之后才生成的
    path: [/^\/api\//],
  })
);

const loginRouter = require("./router/login");
app.use("/api", loginRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
