const mongoose = require('mongoose');
const url = "mongodb+srv://22110452:5yc7mxEBjTUl6xXA@cluster0.8eh0zch.mongodb.net/Tudeptrai?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;