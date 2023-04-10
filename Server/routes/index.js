var express = require('express');
var router = express.Router();

const userController = require('../components/user/UserController');

const jwt = require('jsonwebtoken');
const { checkTokenCpanel } = require('../middle/Authen');

/* GET home page. */
//http://localhost:3000/
router.get('/', [checkTokenCpanel], function (req, res, next) {
  //hien thi trang chu
  res.render('index');
});

//http://localhost:3000/login
router.get('/login', [checkTokenCpanel], async function (req, res, next) {
  //hien thi trang login
  res.render('user/login');
});

//http://localhost:3000/login
router.post('/login', async (req, res, next) => {
  //xu li login
  //neu login thanh cong thi chuyen qua trang chu
  // neu login that bai chuyen qua trang login
  const { email, password } = req.body;
  const result = await userController.login(email, password);
  if (result) {

    // tao token jwt
    // luu token vao session 
    const token = jwt.sign({ _id: result._id, role: result.role }, 'secret', { expiresIn: '1h' });
    req.session.token = token;
    return res.redirect('/');
  }
  else {

    return res.redirect('/login');
  }
});

//http://localhost:3000/logout
router.get('/logout', [checkTokenCpanel], async (req, res, next) => {
  //xu li logout
  // xoa token trong session
  req.session.destroy();
  res.redirect('/login');
});


module.exports = router;
