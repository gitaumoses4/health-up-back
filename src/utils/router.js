import * as express from 'express';
import m from '../database/models';
import Validation from '../middleware/BaseValidator';

const errorHandler = middleware => middleware.map(m => Validation.withErrorHandler(m));

const methods = [
  'post', 'delete', 'get', 'put', 'patch'
];

class MRouter {
  constructor(...defaultMiddleware) {
    this.Router = express.Router();
    this.defaultMiddleware = defaultMiddleware;

    methods.forEach((method) => {
      this[method] = (route, ...middleware) => {
        this.Router[method](route, errorHandler(MRouter.uniqueMiddleware(
          this.defaultMiddleware,
          middleware
        )));
      };
    });
  }

  exclude(...middleware) {
    const found = m => middleware.find(a => a.toString() === m.toString());
    this.defaultMiddleware = this.defaultMiddleware.filter(m => !found(m));

    return this;
  }

  static uniqueMiddleware(defaultMiddleware, middleware) {
    const list = [];
    defaultMiddleware.forEach((m) => {
      let found = null;
      middleware.forEach((m1) => {
        if (m.toString() === m1.toString()) {
          found = m1;
        }
      });
      if (found) {
        list.push(found);
        middleware.splice(middleware.indexOf(found), 1);
      } else {
        list.push(m);
      }
    });
    return [...list, ...middleware];
  }
}


export const models = m;

export default MRouter;
