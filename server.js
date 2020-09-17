// Imports
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Define config file
dotenv.config({ path: './config/config.env' });
// Connect to DB
connectDB();
// Define port
const PORT = process.env.PORT || 5000;

// Import routes
const auth = require('./routes/auth');

// Create app from express
const app = express();

// **** Middlewares ***
app.use(express.json());
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);
app.use(errorHandler);

// Listen
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//Handle Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
