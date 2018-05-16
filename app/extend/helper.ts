/*
 * @Author: Kevin Bolton
 * @Date: 2018-02-01 19:55:07
 * @Last Modified by: Kevin Bolton
 * @Last Modified time: 2018-04-24 21:32:12
 */
"use strict";

const crypto = require("crypto");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const util = require("util");
const quillDeltaToHtmlConverter = require("quill-delta-to-html");
const gm = require("gm").subClass({ imageMagick: true });
const fs = require("fs");
const imageSizeOf = require("image-size");

// 常量
const {
  SECRETKEY,
  IMAGE_MAX_WIDTH,
  IMAGE_MAX_HEIGHT,
  UPLOADURLPREFIX,
  QUILL_IMAGE_MAX_WIDTH
} = require("../common/consts");

const helper = {
  // [CURD]
  find: (model, { where, find, limit, sort }) =>
    model
      .where(where || {})
      .find(find || {})
      .limit(limit || 500)
      .sort(sort || {}),
  findOne: (model, { findOne }) => model.findOne(findOne || {}),
  update: (model, { where, update }) => model.where(where || {}).update({ $set: update }),
  // [CURD -- END]
  // 返回数据
  result: (): { data: any; message: string } => ({
    data: [],
    message: ""
  }),
  // 获取并处理响应的json数据
  // 输出错误格式
  formatError: () => ({
    errorStatus: true
  }),
  // 设置密码HAMC值
  setHmac: str => {
    const hmac = crypto.createHmac("sha256", SECRETKEY);
    hmac.update(SECRETKEY);
    hmac.update(str);
    return hmac.digest("hex");
  },
  // 处理日期时间 -> 格式化日期 如: 2017-07-26
  dateTodateline(time) {
    return moment(parseInt(time, 10)).format("YYYY-MM-DD");
  },
  // Token
  // sign token (生成Token)
  signToken(token) {
    return jwt.sign(token, SECRETKEY);
  },
  // verify token (解密Token)
  verifyToken(token) {
    return util.promisify(jwt.verify)(token, SECRETKEY);
  },
  // 分页
  // arr: 数组  cur: 当前页码  size: 当前页条数
  getCurArr(arr, cur, size) {
    const start = (cur - 1) * size; // 开始的索引
    const end = cur * size; // 结束的索引

    return arr.slice(start, end);
  },
  // 压缩图片
  // options = { maxWidth, maxHeight, quality = 90, ratio = 3/4 }
  compressImage(image: string, options?: any): void {
    // 图片宽和高的最大值
    const maxWidth = (options && options.maxWidth) || IMAGE_MAX_WIDTH;
    const maxHeight = (options && options.maxHeight) || IMAGE_MAX_HEIGHT;
    // 图片缩放比
    const ratio = (options && options.ratio) || maxHeight / maxWidth;
    // 图片尺寸
    const defaultSize = { width: 0, height: 0 };
    // 存储处理后图片尺寸的width和height
    const resize: { width: number; height: number } = {
      width: 0,
      height: 0
    };

    // 获取图片
    const newImageUrl = `${UPLOADURLPREFIX}/public${image}`;
    const handle = gm(newImageUrl);
    handle.size((err, size) => {
      if (!err) {
        Object.assign(defaultSize, size);

        // 获取处理后图片尺寸的width和height
        resize.width =
          defaultSize.width > maxWidth ? maxWidth : defaultSize.width;
        if (defaultSize.width >= defaultSize.height) {
          resize.height = resize.width * ratio;
        } else {
          resize.height = resize.width * (1 / ratio);
        }
        if (defaultSize.height < resize.height) {
          resize.height = defaultSize.height;
        }
        // console.log('-----------------------------');
        // console.log(resize.width, 'resize.width');
        // console.log(resize.height, 'resize.height');
        // console.log(ratio, 'ratio');
        // console.log('                             ');
        // console.log(ratio > 1 ? resize.weight : null, '1');
        // console.log(ratio > 1 ? null : resize.height, '2');
        // console.log('-----------------------------');

        try {
          handle
            .resize(
              ratio > 1 ? resize.height : null,
              ratio > 1 ? null : resize.height
            )
            .strip() // 类似noProfile() 删除用户配置文件
            .autoOrient()
            .crop(resize.width, resize.height, 0, 0) // 裁剪图片
            .quality((options && options.quality) || 80) // 设置压缩质量: 0-100
            .write(newImageUrl, err => {
              if (err) throw err;
            });
        } catch (error) {
          console.log(error, "图片处理异常");
        }
      }
    });
  },
  // 生成缩略图
  thumbImage(image) {
    // 图片宽和高的最大值
    const maxWidth = 480;
    const maxHeight = 360;
    // 图片缩放比
    const ratio = maxHeight / maxWidth;
    // 图片尺寸
    const defaultSize = { width: 0, height: 0 };
    // 存储处理后图片尺寸的width和height
    const resize: { width: number; height: number } = {
      width: 0,
      height: 0
    };

    // 获取图片
    const PREFIX = `${UPLOADURLPREFIX}/public`;
    const dir = "/uploads/article/";
    const img = image.split("/");
    const { length } = img;
    const file = img[length - 1];
    const url = `${PREFIX}${dir}${file}`;
    const thumb =
      file.indexOf("thumb-") === -1 ? `${dir}thumb-${file}` : `${dir}${file}`;
    const thumbUrl = `${PREFIX}${thumb}`;
    const handle = gm(url);

    handle.size((err, size) => {
      if (!err) {
        Object.assign(defaultSize, size);

        // 获取处理后图片尺寸的width和height
        resize.width =
          defaultSize.width > maxWidth ? maxWidth : defaultSize.width;
        if (defaultSize.width >= defaultSize.height) {
          resize.height = resize.width * ratio;
        } else {
          resize.height = resize.width * (1 / ratio);
        }
        if (defaultSize.height < resize.height) {
          resize.height = defaultSize.height;
        }

        try {
          handle
            .resize(
              ratio > 1 ? resize.height : null,
              ratio > 1 ? null : resize.height
            )
            .strip() // 类似noProfile() 删除用户配置文件
            .autoOrient()
            .crop(resize.width, resize.height, 0, 0) // 裁剪图片
            .quality(60) // 设置压缩质量: 0-100
            .write(thumbUrl, err => {
              if (err) throw err;
            });
        } catch (error) {
          console.log(error, "图片处理异常");
        }
      }
    });
    // console.log(thumb, 'thumb');
    return thumb;
  },
  // 转码ReactQuill的Content内容
  // return html
  converTohtml(delta) {
    const newDelta = helper.addWidth(delta);
    const converter = new quillDeltaToHtmlConverter(newDelta, {});
    return converter.convert();
  },
  // Content内容中，遍历image并增加属性width: '100%'
  addWidth(delta) {
    const defaultSize = { width: 0, height: 0 };
    return delta.reduce((arr, current) => {
      if (current.insert.image) {
        if (!current.attributes || !current.attributes.width) {
          const size = helper.readImageAsync(current.insert.image);
          defaultSize.width = size.width;
          defaultSize.height = size.height;

          current.attributes = {
            ...current.attributes,
            width:
              defaultSize.width > QUILL_IMAGE_MAX_WIDTH
                ? "100%"
                : defaultSize.width || "100%",
            style: "{ display: 'block' }"
          };
        }
      }
      arr.push(current);
      // console.log(arr, 'arr');
      return arr;
    }, []);
  },
  // 同步读取图片
  readImageAsync(image) {
    const index = image.indexOf("/upload");
    const newImage = `${UPLOADURLPREFIX}/public${image.slice(index)}`;
    const imageSize = { width: 0, height: 0 };
    // 如果图片存在
    if (fs.existsSync(newImage)) {
      const sizeOf = imageSizeOf(newImage);
      imageSize.width = sizeOf.width;
      imageSize.height = sizeOf.height;
    }
    return imageSize;
  }
};

export default helper;
