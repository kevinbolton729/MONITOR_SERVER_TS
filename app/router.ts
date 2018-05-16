"use strict";

import { Application } from "egg";

/**
 * @param {Egg.Application} app - egg application
 */
export default (app: Application) => {
  const { router, controller } = app;
  // controller
  const { user } = controller;

  router.get("/", ctx => {
    // 生成环境版
    ctx.redirect("/public");
  });

  // [CMS端接口]
  // 接口 api: users
  // -- 获取 登录用户信息
  router.get("/api/admin/currentUser", user.getCurrentUser);
  // -- 登录用户 loginon
  router.post("/api/admin/loginon", user.loginOn);
  // -- 安全退出 loginout
  router.post("/api/admin/loginout", user.loginOut);
  // -- 更新登录密码
  router.post("/api/admin/updatepwd", user.updateLoginpwd);
  // -- 更新个人信息
  router.post("/api/admin/updateuser", user.updateCurrentUser);
};
