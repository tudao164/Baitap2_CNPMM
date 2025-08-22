const express = require('express');
const connectDB = require('./config/db');
const userRoute = require('./route/userRoute');
const path = require('path');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
connectDB();

app.use('/user', userRoute);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});