

const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');
//1 Kiểm tra email,pass
//2 kiểm tra email co tồn tại trong database ko
// 3 kiểm tra pass có đúng không
// 4 nếu đúng trả về thông tin user
// 5 nếu sai trả về null
const login = async (email, password) => {
  // const user = users.find(u => u.email == email);
  // if (user && user.password == password) {
  //   return user;
  // }
  // return null;
  try {
    const user = await userModel.findOne({ email: email }); // select * from users where email = email

    if (user) {
      const result = bcrypt.compareSync(password, user.password);
      return result ? user : false;
    }
  } catch (error) {
    console.log('Login error', error);
  }
  return false;
}


const register = async (email, password, name) => {
  try {
    // kiem tra email co trong database hay chua
    const user = await userModel.findOne({ email: email }); // select * from users where email = email
    if (user) return false;
    // them moi uservao database
    // ma hoa passwrod
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = { email, password: hash, name, role: 1 };
    const u = new userModel(newUser);
    await u.save();

    return true;

  } catch (error) {
    console.log('Register error', error)
  }
  return false;
}
module.exports = { login, register };
var users = [
  { _id: 1, email: 'abc@gmail.com', password: '1', name: 'ABC' },
  { _id: 2, email: 'def@gmail.com', password: '1', name: 'DEF' },
  { _id: 3, email: 'ijk@gmail.com', password: '1', name: 'IJK' },

]