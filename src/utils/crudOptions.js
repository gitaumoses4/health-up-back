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
    response: result => result
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
    response: result => result,
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
    response: result => result,
    pagination: null
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
    response: result => result,
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
    response: result => result,
  }
};

const config = {
  defaultMiddleware: []
};

export default { options, config };
