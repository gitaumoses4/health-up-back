import _ from 'lodash';
import pluralize from 'pluralize';
import MRouter from './router';
import models from '../database/models';
import crudOptions from './crudOptions';


const defaultOptions = crudOptions;

class CRUDController {
  constructor(model, endpoint, options, defaultMiddleware = []) {
    this.model = model;
    this.endpoint = endpoint;
    this.Router = new MRouter();
    this.defaultMiddleware = defaultMiddleware;
    this.options = _.merge(defaultOptions, options);
    Object.keys(this.options).forEach(
      type => this.generateEndpoints(type)
    );
  }

  async withPagination(req, pagination, changed) {
    const { query: { page = 1, limit = 10 } } = req;
    const params = _.merge({ where: { } }, changed);
    if (pagination) {
      params.limit = limit;
      params.offset = (page - 1) * limit;
    }
    const result = await models[this.model].findAndCountAll(params);
    return {
      rows: result.rows,
      pagination: pagination ? {
        count: result.rows.length,
        currentPage: +page,
        lastPage: Math.ceil(result.count / limit),
        total: result.count
      } : undefined
    };
  }

  generateFields(req, retrieveFields, keys = models[this.model].tableAttributes) {
    const allFields = Object.keys(keys);
    let fields = retrieveFields;
    if (retrieveFields.constructor === Function) {
      fields = retrieveFields(req);
    }

    if (fields.constructor === Array) {
      return fields;
    } if (fields.constructor === Object) {
      const { exclude } = fields;
      if (exclude && exclude.constructor === Array) {
        return allFields.filter(field => !exclude.includes(field));
      }
    } if (fields.constructor === String && fields === '*') {
      return allFields;
    }
    return [];
  }


  create() {
    return async (req) => {
      const {
        fields, preCreate, create, postCreate, response
      } = this.options.create;
      const mapped = _.pick(req.body, this.generateFields(fields));
      await preCreate(req.body);
      const changed = _.merge({ ...mapped }, await preCreate(req));
      const result = await models[this.model].create(changed, await create(req));
      await result.reload();
      await postCreate(result);

      const updatedResponse = _.assign(result.dataValues, await response(result));
      return [
        201,
        { [this.model.toLowerCase()]: updatedResponse },
        `${this.model} created successfully`
      ];
    };
  }

  read() {
    return async (req) => {
      const {
        field, preRead, read, postRead, response, fields
      } = this.options.read;

      await preRead();
      const changed = await read(req);
      const params = _.merge({ where: { [field]: req.params[field] } }, changed);

      const result = await models[this.model].findOne(params);
      await postRead(req, result);

      const updatedResponse = _.merge(
        _.pick(result,
          this.generateFields(req, fields, result.dataValues)),
        await response(result)
      );
      return [
        200,
        { [this.model.toLowerCase()]: updatedResponse },
        `${this.model} retrieved successfully`
      ];
    };
  }

  list() {
    return async (req) => {
      const {
        preList, list, postList, response, fields, pagination
      } = this.options.list;

      await preList();
      const changed = await list(req);

      const results = await this.withPagination(req, pagination, changed);
      await postList(req, results.rows);

      const updatedResponse = await Promise.all(
        results.rows.map(
          async result => _.merge(
            _.pick(
              result, this.generateFields(
                req, fields, result.dataValues
              )
            ),
            await response(result)
          )
        )
      );
      return [
        200,
        { [pluralize.plural(this.model.toLowerCase())]: updatedResponse },
        `${this.model} retrieved successfully`,
        results.pagination
      ];
    };
  }

  update() {
    return async (req) => {

    };
  }

  delete() {
    return async (req) => {

    };
  }

  generateEndpoints(type) {
    const singleEndpoint = `${this.endpoint}/:${this.options.read.field}`;
    const methods = {
      create: { method: 'post', endpoint: this.endpoint },
      read: { method: 'get', endpoint: singleEndpoint },
      list: { method: 'get', endpoint: this.endpoint },
      update: { method: 'put', endpoint: singleEndpoint },
      delete: { method: 'delete', endpoint: singleEndpoint }
    };
    const { method, endpoint } = methods[type];
    const { middleware } = this.options[type];
    this.Router[method](endpoint,
      ...this.defaultMiddleware,
      ...middleware,
      this[type]());
  }
}

export default CRUDController;
