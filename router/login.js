/**登录注册路由 */
const express = require("express");

const router = express.Router();

const loginHandler = require("../router_handle/login");

const expressJoi = require("@escook/express-joi");
const { login_limit } = require("../limit/login");

router.post("/register", expressJoi(login_limit), loginHandler.register);
router.post("/login", expressJoi(login_limit), loginHandler.login);

module.exports = router;
