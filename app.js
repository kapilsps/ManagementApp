const createError       = require('http-errors');
const express           = require('express');
const path              = require('path');
const cookieParser      = require('cookie-parser');
const logger            = require('morgan');
const expressLayouts    = require('express-ejs-layouts');
const flashMessages     = require('connect-flash');
const session           = require('express-session');
const passport          = require('passport');

//routes
const indexRouter       = require('./routes/index');
const usersRouter       = require('./routes/users');
const authRouter        = require('./routes/auth');

//middleware
const middleware = require('./middleware/check-authenticated')

//require passport utility
require('./utilites/passport')(passport);

const app = express();

//session 
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

//flash messages
app.use(flashMessages());

//passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.use(expressLayouts);
app.set('layout', path.join(__dirname, 'views', 'layouts', 'app_layout.ejs'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//fontawesome
app.use('/fontawesome-free', express.static(path.join(__dirname, 'node_modules', '@fortawesome', 'fontawesome-free')));



//local variables
app.use(function(req, res, next){
    res.locals.success  = req.flash('success');
    res.locals.fail     = req.flash('fail');
    res.locals.fail     = req.flash('error');
    res.locals.info     = req.flash('info');
    res.locals.warning  = req.flash('warning');
    next();
});

//routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', middleware.check, usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
