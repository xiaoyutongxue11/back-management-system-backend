/**登录注册路由 */
const express = require("express");

const router = express.Router();

const loginHandler = require("../router_handle/login");

router.post("/register", loginHandler.register);
router.post("/login", loginHandler.login);

module.exports = router;
