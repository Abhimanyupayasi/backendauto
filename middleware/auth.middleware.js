import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
     // const {token} = req.cookies;
    const token = req.query.token;
    


    if(!token ){
        // return next(new AppError('please login to access this resource', 401))
        return res.redirect('/login');
    }

    const userDetails = jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;
    next();

}

export{
    isLoggedIn
}