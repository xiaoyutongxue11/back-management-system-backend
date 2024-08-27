const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
// 当extended为false时，req.body只能解析application/x-www-form-urlencoded（数组/字符串）格式的数据，为true时，可以解析application/json（任意）格式的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRouter = require("./router/login");
app.use("/api", loginRouter);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
