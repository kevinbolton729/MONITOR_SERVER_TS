/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-09 11:47:36
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-24 20:35:49
 */
"use strict";

import { Context } from "egg";

// 常量
const {
  COOKIESKEY,
  TOKENERROR,
  JWTEXPIRED,
  JWTMALFORMED,
  JWTSIGNATURE,
  JWTINVALIDSIGNATURE
} = require("../common/consts");
// 方法
import helper from "../extend/helper";
const { verifyToken } = helper;

// 验证token的白名单，名单内的不需验证
function noVerifyToken(url) {
  if (url === "/") return true;
  // 白名单（白名单内的请求地址不需验证）
  const ignores = ["/loginon", "/register", "/public/", "/front/"];
  const result = ignores.reduce((arr: any[], current) => {
    if (url.indexOf(current) !== -1) {
      arr.push(current);
    }
    return arr;
  }, []);

  return result.length !== 0;
}

// parse token (解析Token字符串)
async function parseToken(tokenString) {
  const result: { data: any } = { data: null };
  const errorMessage = {
    "jwt expired": JWTEXPIRED,
    "jwt malformed": JWTMALFORMED,
    "jwt signature is required": JWTSIGNATURE,
    "invalid signature": JWTINVALIDSIGNATURE,
    "jwt audience invalid. expected: [OPTIONS AUDIENCE]": "Token观众无效",
    "jwt issuer invalid. expected: [OPTIONS ISSUER]": "Token发行人无效",
    "jwt id invalid. expected: [OPTIONS JWT ID]": "Token ID无效",
    "jwt subject invalid. expected: [OPTIONS SUBJECT]": "Token主题无效"
  };

  if (!tokenString) {
    return result.data;
  }

  const token = tokenString.split(" ")[1];

  // 解密token
  await verifyToken(token)
    .then(res => {
      result.data = {
        code: 1,
        data: res.name
        // iat: res.iat,
        // exp: res.exp,
      };
    })
    .catch(err => {
      result.data = {
        code: 0,
        message: errorMessage[err.message]
      };
    });

  return result.data;
}

export default function verifytoken() {
  return async (ctx: Context, next: any) => {
    // const { headers, url } = ctx.request;
    // const { authorization } = headers;
    const { cookies, request } = ctx;
    const { url } = request;
    // 获取cookies
    const GETCOOKIESOPTS = {
      signed: true,
      encrypt: true
    };
    const GETCOOKIES = cookies.get(COOKIESKEY, GETCOOKIESOPTS);
    // console.log(GETCOOKIES, 'GETCOOKIES');

    // 验证请求url是否在白名单内，白名单内的url不需验证token
    if (noVerifyToken(url)) {
      await next();
      return;
    }

    // helper 函数
    const result = ctx.helper.result();
    const { formatError } = ctx.helper;
    // console.log(authorization, 'authorization');
    // console.log(GETCOOKIES, "GETCOOKIES");
    const token = await parseToken(`Bearer ${GETCOOKIES}`);

    // token不存在
    if (!token) {
      result.message = TOKENERROR;
      result.data = await formatError();
    }
    // token验证错误
    if (token.code === 0) {
      result.message = token.message;
      result.data = await formatError();
    }

    if (result.data.errorStatus) {
      ctx.body = result;
    } else {
      ctx.request.token = token;
      await next();
    }
  };
}
