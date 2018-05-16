import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mongoose: {
    enable: true,
    package: "egg-mongoose"
  },
  // 解决跨域
  // install plugin egg-cors
  cors: {
    enable: true,
    package: "egg-cors"
  }
};

export default plugin;
