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
// 修改用户信息
router.post("/updateUserInfo", userInfoHandler.updateUserInfo);
// 修改用户密码
router.post("/changePassword", userInfoHandler.changePassword);

module.exports = router;
