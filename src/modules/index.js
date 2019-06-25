import root from './root';
import users from './users';

const modules = {
  root,
  users
};

const apiVersion = '/api/v1';

// the endpoints will be named based on the name of your modules folder.
// Endpoints in the module named 'root' will not have the name of the folder appended.
export default (app) => {
  const createEndpoint = (module, route) => {
    app.use(`${apiVersion}/${module === 'root' ? '' : module}`, route);
  };

  Object.keys(modules).forEach((module) => {
    if (modules[module].constructor === Array) {
      modules[module].forEach((route) => {
        createEndpoint(module, route);
      });
    } else {
      createEndpoint(module, modules[module]);
    }
  });
  return app;
};
