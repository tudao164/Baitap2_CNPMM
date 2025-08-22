const mongoose = require('mongoose');
const url = "mongodb+srv://22110316:F0hPOlBkkUXb1gRI@cluster0.yijr7y0.mongodb.net/BaiTapTuan2?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;