import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    const { name, email, mobile , password } = req.body;
    
    try {
        const user = await User
        .findOne
        ({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            mobile,

            password: hashedPassword,
            
        });
        await newUser.save();
        
        // res.status(201).json({
        //     result: 'success',
        //     message: 'User created successfully',
        //     newUser
        // });
        
        const token = jwt.sign({
            email: newUser.email,
            userId: newUser._id.toString()
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

         
        res.cookie('token', token, { httpOnly: true, secure: true });
         // return res.render('dashboard' , {newUser,name :newUser.name , token});
         return res.redirect(`/dashboard?name=${encodeURIComponent(name)}&token=${encodeURIComponent(token)}`);
        // res.status(201).json({
        //     token,
        //     userId: newUser._id.toString(),
        //     newUser
        // });
        
        
    }
    catch (error) {
        // res.redirect('/dashboard');
        res.status(500).json({
            message: 'Internal server error'
        });

        



    }
    
    

    // res.redirect('/dashboard', {naame});
    
   
    
    

}



const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.cookie('token', token, { httpOnly: true, secure: true });
        // res.status(200).json({
        //     result: 'success',
        //     message: 'User logged in successfully',
        //     token,

        //     userId: user._id.toString()
        // });
        if(user.role === 'admin'){
            return res.redirect(`/get?name=${encodeURIComponent(user.name)}&token=${encodeURIComponent(token)}`);
        }
        return res.redirect(`/dashboard?name=${encodeURIComponent(user.name)}&token=${encodeURIComponent(token)}`);
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }


    
    
}
const logout = async (req, res) => {
    res.clearCookie('token');
    req.headers['authorization'] = '';

    res.redirect('/login');
    
}

export  { signup, login , logout };