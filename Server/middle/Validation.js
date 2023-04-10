

// bat loi form dang ki
const validationRegister = async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            result: false,
            message: 'Vui long nhap du thong tin'
        });
    } else {
        let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (!regex.test(email)) {
            return res.status(400).json({ result: false,
                 message: 'Email không hợp lệ' });
        }
        regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regex.test(password)) {
            return res.status(400).json({ result: false,
                 message: 'Mật khẩu phải có ít nhất 8 ký tự, chữ và số' });
        }
        return next();
      
    }
   
}
module.exports = { validationRegister }