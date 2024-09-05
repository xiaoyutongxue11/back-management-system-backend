/**用户信息路由 */
const express = require("express");

const router = express.Router();

const userInfoHandler = require("../router_handle/userInfo");

// 上传头像
router.post("/uploadAvatar", userInfoHandler.uploadAvatar);
// 绑定账号
router.post("/bindingAccount", userInfoHandler.bindingAccount);
// 获取用户信息
router.get("/getUserInfo", userInfoHandler.getUserInfo);

module.exports = router;
