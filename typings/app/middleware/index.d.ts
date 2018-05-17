// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Compress from '../../../app/middleware/compress';
import Formatter from '../../../app/middleware/formatter';
import Gzip from '../../../app/middleware/gzip';
import Verifytoken from '../../../app/middleware/verifytoken';

declare module 'egg' {
  interface IMiddleware {
    compress: ReturnType<typeof Compress>;
    formatter: ReturnType<typeof Formatter>;
    gzip: ReturnType<typeof Gzip>;
    verifytoken: ReturnType<typeof Verifytoken>;
  }
}
