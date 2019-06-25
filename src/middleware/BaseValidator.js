import _ from 'lodash';

export default class BaseValidator {
  static async checkField(req, field, Model, message) {
    const exists = await Model.findOne({
      where: {
        [field]: req.body[field]
      },
      raw: true
    });
    req.checkBody(field, message
      || `${_.capitalize(_.startCase(field))} should be unique`)
      .custom(() => exists === null);
  }

  static uniqueFields(fields, Model) {
    return async req => Promise.all(
      Object.keys(fields).map(async field => BaseValidator.checkField(
        req, field, Model, fields[field]
      ))
    );
  }

  static modelExists(field, value, Model, message) {
    return async (req) => {
      const found = await Model.findOne({ where: { [field]: req[value][field] } });
      if (!found) {
        req.errorStatus = 404;

        throw new Error(message || `${Model.name} not found`);
      }
    };
  }

  static errorHandler(res, errors, next) {
    if (errors) {
      return [
        422,
        {
          errors: errors.map(error => ({ message: error.msg, param: error.param }))
        },
        'Validation error'
      ];
    }
    next();
  }

  static requiredFields(all, oneOrMany) {
    return (req) => {
      const checkField = (field, dataSource = 'body') => {
        const message = `${_.capitalize(_.startCase(field))} cannot be empty`;
        req[`check${_.capitalize(dataSource)}`](field, message).notEmpty();
      };

      const checkAll = (input, dataSource = 'body') => {
        input.forEach((field) => {
          checkField(field, dataSource);
        });
      };

      const checkOneOrMany = (input, dataSource = 'body') => {
        const fields = input.some(field => (req[dataSource][field]));
        if (!fields) {
          checkAll(input, dataSource);
        }
      };


      const { body, params, query } = all;

      if (oneOrMany) {
        const { body: bodyEither, params: paramsEither } = oneOrMany;
        if (bodyEither) checkOneOrMany(bodyEither);
        if (paramsEither) checkOneOrMany(paramsEither);
        if (oneOrMany instanceof Array) checkOneOrMany(oneOrMany);
      }

      if (body) checkAll(body);
      if (params) checkAll(params, 'params');
      if (query) checkAll(query, 'query');
      if (all instanceof Array) checkAll(all);
    };
  }

  static withErrorHandler(Validator) {
    return async (req, res, next) => {
      try {
        let result = await Validator(req, res, next);

        if (req.validationErrors()) {
          result = BaseValidator.errorHandler(res, req.validationErrors(), next);
        }
        if (result && result.length > 0 && result[0]) {
          const [statusCode, data, message, meta] = result;
          res.status(statusCode).json({
            success: statusCode < 400,
            message,
            ...data,
            meta
          });
        } else {
          next();
        }
      } catch (error) {
        res.status(req.errorStatus || 500).json({
          success: false,
          message: error.message
        });
        console.error(error);
      }
    };
  }
}
