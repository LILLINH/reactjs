


const jwt = require('jsonwebtoken');


// kiem tra token cua web cpanel
const checkTokenCpanel = (req, res, next) => {
    const { session } = req; // lay session
    const url = req.originalUrl.toLowerCase(); // lay url
    //url :http://localhost:3000/cpanel/product/new
    // neu khong co session thi chuyen qua login
    if (!session.token) {
        // muon login  ----> ok

        if (url.includes('/login')) {
            return next();
        } else { // muon # ---> cho di login
            return res.redirect('/login');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('/login')) {
                return next();

            } else {
                return res.redirect('/login');
            }
        } else {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    if (url.includes('/login')) {
                        return next();

                    } else {
                        return res.redirect('/login');
                    }
                } else {
                    if (url.includes('/login')) {
                        return res.redirect('/'); // chuyen qua trang chu

                    } else {
                        // kiem tra role
                        const { role } = decoded;
                        if (role < 100) {
                            req.session.destroy();
                            return res.redirect('/login');

                        } else {
                            return next()
                        }

                    }
                }
            });
        }
    }
}
const checkTokenApp = (req, res, next) => {
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer')
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, 'secret', function (error, decoded) {
            if (error) {
                return res.status(401).json({ status: false })
            } else {
                return next();
            }
        })
    } else {
        return res.status(401).json({ status: false })
    }
}
module.exports = { checkTokenCpanel, checkTokenApp };