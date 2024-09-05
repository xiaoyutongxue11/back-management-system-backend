// js校验工具
const joi = require("joi");

const rule = joi
  .string()
  .pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/)
  .min(6)
  .max(12)
  .required();
const newPassword = rule;
const oldPassword = rule;
const id = joi.required();

exports.password_limit = {
  // 对req.body中的数据进行校验
  body: {
    id,
    newPassword,
    oldPassword,
  },
};
