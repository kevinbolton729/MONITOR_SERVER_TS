"use strict";

const path = require("path");

function resolve() {
  return path.join(__dirname, "..");
}
module.exports = {
  // Upload 定位至 /app
  UPLOADURLPREFIX: resolve(),
  // Message
  MSGETDATASUCCESS: "获取数据成功",
  MSGETDATAERROR: "获取数据出错！",
  MSGETDATANODATA: "对不起！什么也没有",
  MSGETAPI: "请联系管理员获取 Api 接口...",
  // 登录
  MSGLOGINSUCCESS: "登录成功",
  MSGLOGINFAIL: "账号和密码错误",
  MSGLOGINNOINPUT: "请输入账号和密码",
  MSGNOLOGIN: "当前未登录",
  MSGLOGINOUTSUCCESS: "您已安全退出",
  MSGLOGINING: "已登录",
  // 站点
  SITEDELSUCCESS: "站点已删除成功",
  SITEADDSUCCESS: "添加站点成功",
  SITEDELFAIL: "删除站点不成功",
  SITEEDITSUCCESS: "站点已修改成功",
  SITEEDITFAIL: "编辑站点不成功",
  SITEADDFAIL: "添加站点不成功",
  SITEADDCHANNELSUCCESS: "站点添加栏目成功",
  // 文章
  ARTICLEDELSUCCESS: "文章已删除成功",
  ARTICLEADDSUCCESS: "添加文章成功",
  ARTICLEDELFAIL: "删除文章不成功",
  ARTICLEEDITSUCCESS: "文章已修改成功",
  ARTICLEEDITFAIL: "编辑文章不成功",
  ARTICLEADDFAIL: "添加文章不成功",
  // 栏目
  CHANNELDELSUCCESS: "栏目已删除成功",
  CHANNELADDSUCCESS: "添加栏目成功",
  CHANNELDELFAIL: "删除栏目不成功",
  CHANNELEDITSUCCESS: "栏目已修改成功",
  CHANNELEDITFAIL: "编辑栏目不成功",
  CHANNELADDFAIL: "添加栏目不成功",
  // 加盟申请
  APPLYADDSUCCESS: "加盟申请已提交",
  APPLYADDFAIL: "加盟申请提交不失败",
  // 添加、编辑通用
  GLOBALDELSUCCESS: "删除成功",
  GLOBALADDSUCCESS: "添加成功",
  GLOBALDELFAIL: "删除不成功",
  GLOBALEDITSUCCESS: "修改成功",
  GLOBALEDITFAIL: "编辑不成功",
  GLOBALADDFAIL: "添加不成功",
  // 分页
  // 默认页长（显示条数）
  PAGEDEFAULTLIMIT: 5000,
  // 修改登录密码
  UPDATEPWDINPUTPWD: "请输入原密码和新密码",
  UPDATEPWDERR: "更新密码不成功",
  UPDATEPWDSUCCESS: "您的登录密码已修改",
  UPDATEOLDNEWERROR: "请输入不一样的新旧密码",
  UPDATEOLDERROR: "您输入的旧密码不正确",
  // 修改信息
  UPDATEFAILTURE: "更新不成功",
  UPDATESUCCESS: "修改成功",
  // COOKIES
  COOKIESKEY: "TOKEN_COOKIES",
  // 密钥
  SECRETKEY: "SECRETKEY-KEVIN",
  // Token
  // token签名 有效期为30天
  EXPIRESIN: 60 * 60 * 24 * 30,
  TOKENERROR: "获取Token错误",
  JWTEXPIRED: "您的身份认证已过期，请重新登录！",
  JWTMALFORMED: "您的身份认证异常，请重新登录！",
  JWTSIGNATURE: "身份认证须签名，请重新登录！",
  JWTINVALIDSIGNATURE: "您的签名无效，请重新登录！",
  // [CONTENT]
  NODATA: "暂无数据",
  // 图片处理 Image Handler Default: 1440 x 1080
  IMAGE_MAX_WIDTH: 1920,
  IMAGE_MAX_HEIGHT: 1440,
  // Quill Content Image
  QUILL_IMAGE_MAX_WIDTH: 1000
};
