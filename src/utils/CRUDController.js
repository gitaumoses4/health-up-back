import _ from 'lodash';
import pluralize from 'pluralize';
import MRouter from './router';
import models from '../database/models';
import crudOptions from './crudOptions';
import BaseValidator from '../middleware/BaseValidator';


const { options: defaultOptions, config: defaultConfig } = crudOptions;

const cleanEndpoint = (endpoint) => {
  if (endpoint) {
    return endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  }
  return '';
};

const cleanMessage = (result, message, defaultMessage) => {
  if (message) {
    if (message.constructor === Function) {
      return message(result);
    }
    return message;
  }
  return defaultMessage;
};

class CRUDController {
  constructor(model, endpoint, options, config) {
    this.model = model;
    this.config = _.merge({ ...defaultConfig }, config);
    this.endpoint = cleanEndpoint(endpoint);
    this.Router = new MRouter();
    this.defaultMiddleware = this.config.defaultMiddleware;
    this.options = _.merge({}, { ...defaultOptions }, options);
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

  generateFields(req, retrieveFields = [], keys = models[this.model].tableAttributes) {
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

  create(type) {
    return async (req) => {
      const {
        fields,
        preCreate,
        create,
        postCreate,
        response,
        message
      } = this.options[type];
      const mapped = _.pick(req.body, this.generateFields(req, fields));
      const changed = _.merge({ ...mapped }, await preCreate(req));
      const result = await models[this.model].create(changed, await create(req));
      await result.reload();
      await postCreate(result);

      return response(
        {
          req,
          model: this.model,
          status: 201,
          data: result,
          message: cleanMessage(result, message, `${this.model} created successfully`)
        }
      );
    };
  }

  read(type) {
    return async (req) => {
      const {
        field,
        preRead,
        read,
        modelOptions,
        postRead,
        response,
        fields,
        message
      } = this.options[type];

      await preRead();
      const changed = await read(req);
      const params = _.merge({ where: this.createFieldParam(field, req) }, changed);

      let modelApi = models[this.model];
      if (modelOptions.unscoped) {
        modelApi = modelApi.unscoped();
      }
      const result = await modelApi.findOne(params);
      await postRead(req, result);

      const updatedResponse = _.pick(result, this.generateFields(req, fields, result.dataValues));
      return response(
        {
          req,
          model: this.model,
          status: 200,
          data: updatedResponse,
          message: cleanMessage(result, message, `${this.model} retrieved successfully`)
        }
      );
    };
  }

  list(type) {
    return async (req) => {
      const {
        preList, list, postList, response, fields, pagination, message
      } = this.options[type];

      await preList();
      const changed = await list(req);

      const results = await this.withPagination(req, pagination, changed);
      await postList(req, results.rows);

      const updatedResponse = await Promise.all(
        results.rows.map(
          async result => _.pick(
            result, this.generateFields(
              req, fields, result.dataValues
            )
          )
        )
      );

      return response(
        {
          req,
          status: 200,
          model: this.model,
          data: updatedResponse,
          message: cleanMessage(
            updatedResponse, message,
            `${pluralize.plural(this.model)} retrieved successfully`
          ),
          pagination: results.pagination
        }
      );
    };
  }

  createFieldParam(field, req) {
    const { name, location = 'params' } = field;
    return { [name]: req[location][name] };
  }

  update(type) {
    return async (req) => {
      const {
        fields, preUpdate, update, postUpdate, response, field, message
      } = this.options[type];
      const mapped = _.pick(req.body, this.generateFields(req, fields));
      const changed = _.merge({ ...mapped }, await preUpdate(req));

      const params = _.merge({ where: this.createFieldParam(field, req) }, await update(req));

      const toUpdate = await models[this.model].findOne(params);
      const result = await toUpdate.update(changed);
      await result.reload();
      await postUpdate(result);

      return response(
        {
          req,
          model: this.model,
          status: 200,
          data: result,
          message: cleanMessage(result, message, `${this.model} updated successfully`)
        }
      );
    };
  }

  delete(type) {
    return async (req) => {
      const {
        preDelete, delete: _delete, postDelete, response, field, message
      } = this.options[type];
      const params = _.merge({ where: this.createFieldParam(field, req) }, await preDelete(req));

      const toDelete = await models[this.model].findOne(params);
      await toDelete.destroy(await _delete(req));
      await postDelete(toDelete);

      return response(
        {
          req,
          model: this.model,
          status: 200,
          data: toDelete,
          message: cleanMessage(toDelete, message, `${this.model} deleted successfully`)
        }
      );
    };
  }

  generateEndpoint(endpoint, field) {
    let newEndpoint = endpoint;
    if (endpoint.constructor === Function) {
      newEndpoint = endpoint(field.name ? field.name : field);
    }
    return `${this.endpoint}${newEndpoint.startsWith('/') ? '' : '/'}${newEndpoint}`;
  }

  generateEndpoints(type) {
    const controller = defaultOptions[this.options[type].controller];
    this.options[type] = _.merge({}, controller, this.options[type]);
    const { middleware } = this.options[type];
    const { notFound } = this.config;
    const newMiddleware = [...middleware];
    if (['delete', 'update', 'read'].includes(this.options[type].controller)) {
      const { field } = this.options[type];
      newMiddleware.push(
        BaseValidator.modelExists(
          field, models[this.model],
          notFound
        )
      );
    }

    const { method } = this.options[type];
    const endpoint = this.generateEndpoint(this.options[type].endpoint, this.options[type].field);
    this.Router[method](
      endpoint,
      ...this.defaultMiddleware,
      ...newMiddleware,
      this[this.options[type].controller || type](type)
    );
  }
}

export default CRUDController;
