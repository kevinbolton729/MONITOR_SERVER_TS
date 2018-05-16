/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 20:30:20
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-05-16 13:32:19
 */
"use strict";

import { Controller, Icookie } from "egg";
// 常量
const { COOKIESKEY, MSGLOGINOUTSUCCESS } = require("../common/consts");

export default class UserController extends Controller {
  // 获取currentUser
  public async getCurrentUser() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.CurrentUserModel();
  }
  // 登录
  public async loginOn() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.LoginOnModel();
  }
  // 退出
  public async loginOut() {
    const { ctx } = this;
    const result = ctx.helper.result();
    result.message = MSGLOGINOUTSUCCESS;
    result.data = [];

    (ctx.cookies as Icookie).set(COOKIESKEY, null);
    ctx.body = result;
  }
  // 修改登录密码
  public async updateLoginpwd() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.UpdateLoginPwdModel();
  }
  // 修改个人信息
  public async updateCurrentUser() {
    const { ctx, service } = this;
    const { user } = service;

    ctx.body = await user.UpdateCurrentUserModel();
  }
}
