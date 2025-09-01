const mongoose = require('mongoose');

exports.connectDB = async function(uri){
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log('[auth] Mongo connected');
};
