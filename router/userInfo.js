/**用户信息路由 */
const express = require("express");

const router = express.Router();

const userInfoHandler = require("../router_handle/userInfo");

router.post("/uploadAvatar", userInfoHandler.uploadAvatar);

module.exports = router;
