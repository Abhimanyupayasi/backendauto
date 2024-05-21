import express  from "express";
import userRouter from "./routers/user.router.js";
const app = express();
import morgan from "morgan";
import { isLoggedIn } from "./middleware/auth.middleware.js";
import appointRouter from "./routers/appoint.router.js";

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.render('index');
    res.render('index');
    
    

    });

    app.get('/about', (req, res) => {   
        res.render('about');
    }
    );
    app.get('/contact', (req, res) => {
        res.render('contact');
    }
    );

    app.get('/gallery', (req, res) => {
        res.render('gallery');
    }
    );

    
    app.get('/signup', (req, res) => {
        res.render('signup');
    }
    );
    app.get('/login', (req, res) => {
        res.render('login');
    }
    );
    app.get('/dashboard', isLoggedIn, (req, res) => {
        try {
            const name = req.query.name;
            const token = req.query.token;
            res.render('dashboard', { name, token });
        }
        catch (error) {
            res.redirect('/login');
        }

        
    //     

    // const name = req.query.name;
    // const token = req.query.token;

    // res.render('dashboard', { name, token });
}
);

app.get('/child',isLoggedIn, (req, res) => {
    const name = req.query.name;
    const token = req.query.token;

    res.render('child', { name, token });
});
app.get('/general', isLoggedIn, (req, res) => {
    const name = req.query.name;
    const token = req.query.token;

    res.render('general', { name, token });
});
app.get('/emergency', isLoggedIn, (req, res) => {
    const name = req.query.name;
    const token = req.query.token;

    res.render('emergency', { name, token });
});
app.get('/checkup', isLoggedIn, (req, res) => {
    const name = req.query.name;
    const token = req.query.token;

    res.render('checkup', { name, token });
});
// app.get('/general',isLoggedIn, (req, res) => {
//     const name = req.query.name;
//     const token = req.query.token;

//     res.render('general', { name, token });
// });

app.get('/booked', (req, res) => {
    const name = req.query.name;
    const user = req.query.user;
    const date = req.query.date;
    const slot = req.query.slot;
    const disease = req.query.disease;
    const message = req.query.message;
    const status = req.query.status;

    res.render('booked', { name, user, date, slot, disease, message, status });
}
);

app.get('/get', isLoggedIn, (req, res) => {
    
    const name = req.query.name;
    const token = req.query.token;
    res.render('appoints',{ name, token });
}
);






 app.use(express.json());
 app.use('/api/v1/users', userRouter);
 app.use('/api/v1/appoint', appointRouter);
 
 app.get('*', (req, res) => {
    res.render('404');
}
);


export default app;