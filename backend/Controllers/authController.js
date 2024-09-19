import {User} from '../Schemas/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Register = ( async (req, res) => {
try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const user = new User({ name, email, password: hashedPassword , balance: 1500 });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});



const Login = (async (req, res) => {
try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'b', { expiresIn: '1h' });
    

    // Set the token as a cookie or in the response header

    res.status(200).json({ message: 'Login successful', user: { userId: user._id ,name: user.name, email: user.email ,token  } });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
});

export {Login , Register}