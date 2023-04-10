var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// session cookies
const session = require('express-session');
const mongoose = require('mongoose');
// import cac model, thu tu rat quan trong
require('./components/category/CategoryModel');
require('./components/product/ProductModel');



const indexRouter = require('./routes/index');



// API
const userAPIRouter = require('./routes/api/UserAPI');
const categoryAPIRouter = require('./routes/api/CategoryAPI');
const productAPIRouter = require('./routes/api/ProductAPI');
// Cpanel
const productCpanelRouter = require('./routes/cpanel/ProductCpanel');
const userCpanelRouter = require('./routes/cpanel/UserCpanel');
const categoryCpanelRouter = require('./routes/cpanel/CategoryCpanel');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// khai bao thong tin cua session
app.use(session({
  secret: 'iloveyou', //bi mat 
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

mongoose.connect('mongodb://127.0.0.1:27017/CP17310?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


//http://localhost:3000/
app.use('/', indexRouter);

//http://localhost:3000/api/user
app.use('/api/User', userAPIRouter);
//http://localhost:3000/api/category
app.use('/api/category', categoryAPIRouter);
//http://localhost:3000/api/product
app.use('/api/product', productAPIRouter);

//http://localhost:3000/cpanel/user
app.use('/cpanel/User', userCpanelRouter);
//http://localhost:3000/cpanel/category
app.use('/cpanel/category', categoryCpanelRouter);
//http://localhost:3000/cpanel/product
app.use('/cpanel/product', productCpanelRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//http://localhost:3000/