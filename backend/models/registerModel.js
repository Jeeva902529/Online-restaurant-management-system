const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
   role: {
      type: String,
      required: true
   },
   username: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
});

const RegisterModel = mongoose.model('Register', registerSchema);
module.exports = RegisterModel;
