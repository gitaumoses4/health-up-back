import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import expressValidator from 'express-validator';
import express from 'express';
import modules from './modules';
import Notifications from './utils/Notifications';

const app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.USE_LATENCY === 'true') {
  app.use((req, res, next) => {
    setTimeout(next, 2000);
  });
}

Notifications.scheduleNotifications();

app.use(cors());

modules(app);


// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
