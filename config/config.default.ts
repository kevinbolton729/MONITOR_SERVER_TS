import { EggAppConfig, PowerPartial } from "egg";

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
  gzip: {
    threshold: number;
    enable: boolean;
  };
}

export default (appInfo: EggAppConfig) => {
  const config = {} as PowerPartial<EggAppConfig> & BizConfig;

  // app special config
  // config.sourceUrl = `https://github.com/eggjs/examples/tree/master/${
  //   appInfo.name
  // }`;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_COOKIE`;

  // 启动配置
  // 开发环境
  // config.cluster = {
  //   listen: {
  //     port: 7003,
  //     hostname: '127.0.0.1',
  //   },
  // };
  // 生产环境
  config.cluster = {
    listen: {
      port: 7002,
      hostname: "0.0.0.0"
    }
  };

  // 跨域配置
  config.cors = {
    // 设置来源
    origin: ctx => ctx.headers.origin,
    // 带cookie
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Requested-With",
      "set-cookie"
    ]
  };

  // add your config here
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  config.middleware = ["gzip", "compress", "formatter", "verifytoken"];

  // 中间件的配置
  // gzip
  config.gzip = {
    threshold: 2048, // 小于 2k 的响应体不压缩
    enable: false // 打开/关闭
  };
  // compress
  config.compress = {
    threshold: 2048, // 小于 2k 的响应体不压缩
    enable: true // 打开/关闭
  };

  // database
  config.mongoose = {
    // 开发环境配置
    url: "mongodb://127.0.0.1:27017/MONITOR_DB",
    // 生产环境配置
    // url: 'mongodb://127.0.0.1:27017/XXX_DB',
    options: {
      user: "",
      pass: ""
    }
  };

  // Security
  config.security = {
    csrf: {
      enable: false // 打开/关闭
    }
  };

  // 错误处理
  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      console.log(err, "err");
      ctx.body = "error";
      ctx.status = 500;
    }
  };

  return config;
};
