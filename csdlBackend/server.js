const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');

const customerRouter = require('./routes/customers.routes');
const productRouter = require('./routes/products.routes');
const uploadRouter = require('./routes/upload.routes');
const orderRouter = require('./routes/orders.routes');
const cartRouter = require('./routes/cart.routes');
const filterRouter = require('./routes/filter.routes');
const adminRouter = require('./routes/admin.routes');

const isLoggedIn = require('./middleware/checkLogIn');
const isAdmin = require('./middleware/checkPermission');

const config = {
    user: 'testLogin',
    password: 'lovehangga',
    server: 'DESKTOP-GQSS7EK\\SQLEXPRESS',
    database: 'WebCSDL',
    options: {           
        encrypt: false
    }
};


//  

    // var config = {  
    //     server: `DESKTOP-GQSS7EK\\SQLEXPRESS`,  //update me
    //     authentication: {
    //         type: 'default',
    //         options: {
    //             userName: 'testLogin', //update me
    //             password: 'lovehangga'  //update me
    //         }
    //     },
    //     options: {
    //         // If you are on Microsoft Azure, you need encryption:
    //         encrypt: true,
    //         database: 'WebCSDL'  //update me
    //     }
    // }; 
// 
sql.connect(config, (err, pool) => {
    if (err) console.log(err);
    else {
        console.log("SQL Server Connected...");

        const app = express();

        app.use(express.static('public'));
        app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true
        }));
        app.use(bodyParser.json());
        app.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: false
        }));

        app.get('/test', (req, res) => {
            console.log(req.session.currentUser);
            res.send(req.session.currentUser);
        });

        // route
        app.use('/customer', customerRouter);
        app.use('/product', productRouter);
        app.use('/filter', filterRouter);
        app.use('/upload', uploadRouter);
        app.use('/order', orderRouter);
        app.use('/cart', cartRouter);
        app.use('/admin', adminRouter);

        app.listen(process.env.PORT || 5000, (err) => {
            if (err) throw err;
            else console.log("Server listen on port 5000...");
        });
    }
});

// FIXME: Cai dong nay de lam gi
sql.on('error', err => {
    // error handler
});