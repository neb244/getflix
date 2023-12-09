const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    email: { type: String, unique: true },
    password: { type: String, unique: true, required: true},
    registrationDate: { type: Date, default: Date.now },
    //subscription: String,
  });

  const User = mongoose.model('User', UserSchema);  

  const ContentSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoURL: String,
    publicationDate: { type: Date, default: Date.now },
    category: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      //duration: ,
      //cast: String, 
  });

  const Content = mongoose.model('Content', ContentSchema);

  module.exports = { User, Content };