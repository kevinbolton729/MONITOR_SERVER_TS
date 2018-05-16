declare module "egg" {
  interface Context {
    request: {
      token: {
        code: string | number;
        message: string;
        data: string;
      };
      url: string;
      body: any;
      query: any;
    };
    req: {
      file: { filename: string };
      files: any[];
      body: any;
    };
  }
  interface Ihelper {
    findOne: any;
    result: {
      data: any;
      message: string;
    };
    formatError: {
      errorStatus: boolean;
    };
  }
  interface Ishare {
    csid: string[];
    arr: any[];
    fields: {
      _id?: string;
    };
  }
  interface Iarticle {
    fields: {
      articleSiteId: string;
      articleTitle?: string;
      articleSubtitle?: string;
      articleChannel?: string;
      articleAuthor?: string;
      articleSource?: string;
      articleContent?: string;
      articleParams?: string;
      articleStatus?: number;
      likeNums?: string | number;
      thumb?: string;
      createDate?: string | number;
      updateDate?: string | number;
    };
  }
  interface Ichannel {
    fields: {
      channelSiteId: string;
      channelName?: string;
      channelText?: string;
      channelHref?: string;
      channelStatus?: number;
      isHref?: string | number;
      channelImage?: string;
      createDate?: string | number;
      updateDate?: string | number;
    };
  }
  interface Icookie {
    set: (key: string, val?: any, opts?: any) => void;
  }
}
