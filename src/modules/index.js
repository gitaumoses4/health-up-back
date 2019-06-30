import root from './root';
import users from './users';
import companies from './companies';
import profiles from './profiles';
import CRUDController from '../utils/CRUDController';
import MRouter from '../utils/router';
import healthInformation from './healthInformation';

const modules = {
  root,
  users,
  companies,
  profiles,
  healthInformation
};

const apiVersion = '/api/v1';

// the endpoints will be named based on the name of your modules folder.
// Endpoints in the module named 'root' will not have the name of the folder appended.
export default (app) => {
  const createEndpoint = (module, route) => {
    let router = route;
    if (route.constructor === CRUDController) {
      router = router.Router.Router;
    } else if (route.constructor === MRouter) {
      router = router.Router;
    }
    app.use(apiVersion, router);
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
