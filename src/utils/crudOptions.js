export default {
  create: {
    fields: [],
    preCreate: (req) => {},
    create: (req, mapped) => {},
    middleware: [],
    postCreate: (req, result) => {},
    response: result => ({})
  },
  read: {
    middleware: [],
    preRead: (req) => {
    },
    read: req => ({}),
    postRead: (req, result) => {
    },
    field: 'id',
    fields: '*',
    response: result => ({}),
  },
  list: {
    middleware: [],
    preList: (req) => {},
    list: req => ({

    }),
    fields: '*',
    postList: (req, result) => {},
    response: (result) => {},
    pagination: null
  },
  update: {
    fields: [],
    preUpdate: (req) => {},
    update: (req) => {},
    middleware: [],
    postUpdate: (req, result) => {},
    response: (result) => {}
  },
  delete: {
    middleware: [],
    preDelete: (req) => {},
    delete: (req) => {},
    postDelete: (req, result) => {},
    response: (result) => {}
  }
};
