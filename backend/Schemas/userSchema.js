import mongoose from 'mongoose';



// Define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 2500, 
  },
 
});

// Create a user model using the schema
const User = mongoose.model('User', userSchema);

export { User }; // Export the User and Order models
