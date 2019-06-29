import pluralize from 'pluralize';

const options = {
  create: {
    fields: [],
    preCreate: (req) => {},
    create: (req, mapped) => {},
    middleware: [],
    postCreate: (req, result) => {},
    endpoint: '',
    controller: 'create',
    method: 'post',
    response: ({
      req, model, status, data, message
    }) => ([
      status,
      { [model.toLowerCase()]: data },
      message
    ]),
    message: ''
  },
  read: {
    middleware: [],
    preRead: (req) => {
    },
    read: req => ({}),
    postRead: (req, result) => {
    },
    field: {
      name: 'id',
      type: 'integer'
    },
    fields: '*',
    endpoint: field => `:${field}`,
    method: 'get',
    controller: 'read',
    response: ({
      req, model, status, data, message
    }) => ([
      status,
      { [model.toLowerCase()]: data },
      message
    ]),
    message: ''
  },
  list: {
    middleware: [],
    preList: (req) => {},
    list: req => ({

    }),
    fields: '*',
    postList: (req, result) => {},
    endpoint: '',
    method: 'get',
    controller: 'list',
    response: ({
      req, model, status, data, message, pagination
    }) => ([
      status,
      { [pluralize.plural(model.toLowerCase())]: data },
      message,
      pagination
    ]),
    pagination: null,
    message: ''
  },
  update: {
    fields: [],
    preUpdate: (req) => {},
    update: (req) => {},
    middleware: [],
    endpoint: field => `:${field}`,
    method: 'put',
    controller: 'update',
    field: {
      name: 'id',
      type: 'integer'
    },
    postUpdate: (req, result) => {},
    response: ({
      req, model, status, data, message
    }) => ([
      status,
      { [model.toLowerCase()]: data },
      message
    ]),
    message: ''
  },
  delete: {
    field: {
      name: 'id',
      type: 'integer'
    },
    middleware: [],
    method: 'delete',
    preDelete: (req) => {},
    delete: (req) => {},
    endpoint: field => `:${field}`,
    controller: 'delete',
    postDelete: (req, result) => {},
    response: ({
      req, model, status, data, message
    }) => ([
      status,
      { [model.toLowerCase()]: data },
      message
    ]),
    message: ''
  }
};

const config = {
  defaultMiddleware: []
};

export default { options, config };
