const bcrypt = require("bcryptjs");
const db = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../jwt_config/index");

exports.register = (req, res) => {
  const registerInfo = req.body;
  if (!registerInfo.account || !registerInfo.password) {
    return res.send({
      status: 1,
      message: "账号或密码不能为空",
    });
  }

  const sql = "select * from users where account=?";
  db.query(sql, registerInfo.account, (err, result) => {
    if (result.length > 0) {
      return res.send({
        status: 1,
        message: "该账号已存在",
      });
    }
    // 使用bcryptjs插件对密码进行加密
    registerInfo.password = bcrypt.hashSync(registerInfo.password, 10);
    const sql1 = "insert into users set ?";
    const identity = "用户";
    const create_time = new Date();
    db.query(
      sql1,
      {
        account: registerInfo.account,
        password: registerInfo.password,
        identity,
        create_time,
        status: 0,
      },
      (err, result) => {
        if (result.affectedRows !== 1) {
          return res.send({
            status: 1,
            message: "注册失败",
          });
        }
        res.send({
          status: 0,
          message: "注册成功",
        });
      }
    );
  });
};

exports.login = (req, res) => {
  const loginInfo = req.body;
  const sql = "select * from users where account=?";
  db.query(sql, loginInfo.account, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("该账号不存在");
    const compareResult = bcrypt.compareSync(
      loginInfo.password,
      result[0].password
    );
    if (!compareResult) return res.cc("账号或密码有误");
    if (result[0].status === 1) return res.cc("账号被冻结");
    const user = {
      ...result[0],
      password: "",
      imgUrl: "",
      create_time: "",
      update_time: "",
    };
    const tokenStr = jwt.sign(user, jwtConfig.jwtSecretKey, {
      expiresIn: jwtConfig.expiresIn,
    });
    res.send({
      status: 0,
      result: result[0],
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};
