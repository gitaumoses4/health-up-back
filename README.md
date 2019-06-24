## Create Express App

This template allows you to create an express application based on the following directory structure.

```
/src
    /config
        database.js
        environment.js
    /database
        /models
        /seeders
        /migrations
    /middleware
        index.js
    /modules
        /root
            index.js
        index.js
    /utils
        index.js
    app.js
    index.js
.babelrc
.env
.sequelize.rc
package.json
```

## Setting up routing
Using the modules folder, (this is where the different routes and controllers are setup.) you can have a directory structure as follows.

### Example
```
    /modules
        /users
            /login
                LoginController.js
                index.js
            /signup
                SignUpController.js
                index.js
            index.js
```
Both the `index.js` file in the `login` and `signup` directories will have the default express Router exported.

Finally add the following in the `users/index.js`
```javascript
import login from './login'
import signup from './signup'

export default [
  login,
  signup
]
```

Go to the `modules/index.js` file and add the `users` module to the routing
```javascript
import users from './users';

const modules = {
  users
}
```

This will set up the following endpoints for you:

```
/api/v1/users/login
/api/v1/users/signup
```
which is based on the name of the modules you created.


### Sequelize
The configuration for sequelize is located in `src/config/database.js`

### Middleware
There is an existing folder `/src/middleware` which allows you to create middleware such as validators and middleware functions.

### Happy coding!
