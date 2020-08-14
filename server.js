const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const 

// Route files
const auth = require('./routes/auth');
//const users = require('./routes/users');
const test = require('./routes/test');

//Load env variable
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Implement Middleware
app.use(express.json());
app.use(cookieParser());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/test', test);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle Promise Rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
})
