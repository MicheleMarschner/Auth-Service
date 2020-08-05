const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

//Load env variable
dotenv.config({ path: './config/config.env' });
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', () => {
    console.log('hello');
})

app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

//Handle Promise Rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //Close server & exit process
    server.close(() => process.exit(1));
})
