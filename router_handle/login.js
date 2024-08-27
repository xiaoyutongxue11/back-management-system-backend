const bcrypt = require("bcryptjs/dist/bcrypt");
const db = require("../db/index");
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
  res.send("login");
};
