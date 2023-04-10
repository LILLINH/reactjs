const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../../components/user/UserController');
const { validationRegister } = require('../../middle/Validation')
//http://localhost:3000/api/user

//http://localhost:3000/api/user/login

// api login user
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        if (user) {
            //tao token
            const token = jwt.sign({}, 'secret', { expiresIn: '1h' });
            const returnData = {
                error: false,
                ResponseTimestamp: new Date(),
                statusCode: 200,
                data: {
                    token: token,
                    user: user
                }
            }
            return res.status(200)
                .json(returnData);
        } else {
            return res.status(400)
                .json({ result: true, user: null });

        }
    } catch (error) {
        console.log(error);
        //next(error): danh cho web
        return res.status(500).json({ result: false, user: null });
    }
})
//http://localhost:3000/api/user/register
//api dang ki 
router.post('/register', [validationRegister], async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const user = await userController.register(email, password, name);
        if (user) {
            return res.status(200).json({ result: true, user: user });
        }
        return res.status(400).json({ result: false, user: null });


    } catch (error) {
        console.log(error);

        return res.status(500).json({ result: false, user: null });
    }
})

//api guimail
//http://localhost:3000/api/user/sendmail
router.post('/sendmail', 
//[validationRegister],
 async (req, res, next) => {
    try {
        const { email, subject } = req.body;
        let content = `<h1>Hello </h1>
        <p>ban da dang ki thanh cong tai khoan</p>
        <p>have a god day</p>
        `;
        const result = await userController.sendMail(email, subject, content);
        return res.status(200).json({ result: result });
    } catch (error) {
        console.log('send mail eror', error);
        return res.status(500).json({ result: false });
    }
})




module.exports = router;
