/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-09 11:47:36
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-05-16 13:58:37
 */
"use strict";

import { Context } from "egg";

// 常量
const consts = require("../common/consts");

// 获取并处理响应的json数据
// code 值等于 0:正常 不等于0:获取数据出错
const getResJson = (code = 0, message = consts.MSGETDATAERROR, data = []) => ({
  code,
  message,
  data
});
// 解析响应的json数据
const parseResJson = result => {
  if (result.data.errorStatus) {
    return getResJson(1, result.message || consts.MSGETDATAERROR);
  }
  return getResJson(
    0,
    result.message || consts.MSGETDATASUCCESS,
    result.data || []
  );
};

export default function formatter() {
  return async (ctx: Context, next: any) => {
    await next();

    const { url } = ctx.request;
    const body = ctx.body;

    if (url === "/") return;
    if (!body) return;
    // application/octet-stream
    // if (url.indexOf("/download/") !== -1 || url.indexOf("/getfile/") !== -1) {
    //   return;
    // }

    // 解析并格式化响应的数据
    ctx.body = await parseResJson(body);
  };
}
