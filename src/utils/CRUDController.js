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
  constructor(model, endpoint, options, config, Router = new MRouter()) {
    this.model = model;
    this.config = _.merge({}, { ...defaultConfig }, config);
    this.endpoint = cleanEndpoint(endpoint);
    this.Router = Router;
    this.defaultMiddleware = this.config.defaultMiddleware;
    this.options = _.merge({}, { ...defaultOptions }, options);
    const endpoints = Object.keys(this.options)
      .filter(option => !this.config.exclude.includes(option));

    endpoints.forEach(
      type => this.generateEndpoints(type)
    );

    this.generateChildren();
  }

  async withPagination(req, pagination, changed) {
    const { query: { page = 1, limit = 10 } } = req;
    const { parentParams } = this.config;
    const params = _.merge({ where: { ...parentParams } }, changed);
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
      req.crud = {};
      const mapped = _.pick(req.body, this.generateFields(req, fields));
      req.crud.preCreate = await preCreate(req);
      const changed = _.merge({ ...mapped }, req.crud.preCreate);
      const result = await models[this.model].create(changed, req.crud.create = await create(req));
      await result.reload();
      req.crud.postCreate = await postCreate(result);

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
        unscoped,
        postRead,
        response,
        fields,
        message
      } = this.options[type];

      await preRead();
      const changed = await read(req);
      const params = _.merge({ where: this.createFieldParam(field, req) }, changed);

      let modelApi = models[this.model];
      if (unscoped) {
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

  generateParam(field, endpoint = true) {
    if (field) {
      const str = field.name || field;
      return `${endpoint ? ':' : ''}${this.model.toLowerCase()}${_.capitalize(str)}`;
    }
    return field;
  }

  createFieldParam(field, req) {
    const { name, location = 'params' } = field;
    const { parent, relation } = this.config;
    const parentParams = {};
    if (parent.name) {
      parentParams[parent.name] = req[parent.location][this.generateParam(parent)];
    }
    const params = relation === 'one'
      ? { [name]: req[location][this.generateParam(field, false)] }
      : {};
    return { ...params, ...parentParams };
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
    const { relation } = this.config;
    let newEndpoint = endpoint;
    if (endpoint.constructor === Function) {
      newEndpoint = endpoint(field.name ? field.name : field);
    }
    if (field) {
      const str = field.name || field;
      newEndpoint = newEndpoint.replace(
        `:${str}`, this.generateParam(str)
      );
    }
    if (relation === 'one') {
      return this.endpoint;
    }
    return `${this.endpoint}${newEndpoint.startsWith('/') ? '' : '/'}${newEndpoint}`;
  }

  generateChildren() {
    const { children: { controllers } } = this.config;
    controllers.forEach((child) => {
      const {
        model, endpoint, options, config, field, relation
      } = child;

      const newConfig = _.merge({}, config, {
        exclude: relation === 'one' ? ['list'] : [],
        children: {
          field
        },
        relation
      });

      const controller = new CRUDController(
        model,
        `${this.endpoint}${
          field.location === 'params' ? cleanEndpoint(`:${field.name}`) : ''
        }${cleanEndpoint(endpoint)}`,
        options, newConfig, this.Router
      );
    });
  }

  generateEndpoints(type) {
    const controller = defaultOptions[this.options[type].controller];
    this.options[type] = _.merge({}, controller, this.options[type]);
    const { middleware } = this.options[type];
    const { notFound, relation } = this.config;
    const newMiddleware = [...middleware];
    if (['delete', 'update', 'read'].includes(this.options[type].controller)) {
      const { field } = this.options[type];
      if (relation === 'many') {
        newMiddleware.push(
          BaseValidator.modelExists(
            field,
            models[this.model],
            notFound,
            this.generateParam(field, false)
          )
        );
      } else {
        newMiddleware.push(async (req) => {
          const found = await models[this.model].findOne(this.createFieldParam(field, req));
          if (!found) {
            req.errorStatus = 404;
            throw new Error(notFound || `${this.model} not found`);
          }
        });
      }
    }

    const { method } = this.options[type];
    const endpoint = this.generateEndpoint(this.options[type].endpoint, this.options[type].field);
    console.log(method, endpoint);
    this.Router[method](
      endpoint,
      ...this.defaultMiddleware,
      ...newMiddleware,
      this[this.options[type].controller || type](type)
    );
  }
}

export default CRUDController;
