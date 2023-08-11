const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const viewRouter = require('./routes/viewRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.enable('trust proxy');

app.use(express.static(path.join(__dirname, 'public')));

// set secure https 
app.use(helmet());
app.use(cors());
app.options('*', cors());

console.log(process.env.NODE_ENV);

// MIDDLEWARE
if(process.env.NODE_ENV === 'development'){ 
    console.log('Development Mode');
    app.use(morgan('dev')); 
}

// limits request from a certain ip address
const limiter = rateLimit({
    max:100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many request coming from this ip address, please try again in a hour'
});


app.use('/api', limiter);

// body parsar, reading data from body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended:true, limit: '10kb'}));
app.use(cookieParser());

// Data sanatization agains Nosql attacks
app.use(mongoSanitize());

// Data santization against xss
app.use(xss());

app.use(compression());

// Gets Time of request
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use (function (req, res, next) {
    if (req.secure) {
            // request was via https, so do no special handling
            next();
    } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use('/', viewRouter); // get view Routes

app.listen(process.env.PORT, process.env.IP, function(){
    console.log(`http://${process.env.IP}:${process.env.PORT}`)
});

app.use(globalErrorHandler); // displays global error

