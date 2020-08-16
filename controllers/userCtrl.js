const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  //REGISTER ROUTE
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      //Validation
      if (!email || !password)
        return res.status(400).json({ msg: 'All fields are mandatory' });
      if (!email.match(mailformat))
        return res.status(422).json({ msg: 'Invalid email' });
      if (password.length < 6)
        return res
          .status(422)
          .json({ msg: 'Password must be 6 or more characters long' });
      if (!username) username === email;

      //Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(422).json({ msg: 'Email already exists' });

      //Save User to DB
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //LOGIN ROUTE
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      //Validation
      if (!email || !password)
        return res.status(400).json({ msg: 'All fields are mandatory' });
      if (!email.match(mailformat))
        return res.status(422).json({ msg: 'Invalid email' });

      const loggedInUser = await User.findOne({ email });
      if (!loggedInUser)
        return res.status(400).json({ msg: 'User does not exist' });

      const isMatch = await bcrypt.compare(password, loggedInUser.password);
      if (!isMatch)
        return res.status(400).json({ msg: 'Invalid email/password' });

      // if login success, create a token

      const payload = { id: loggedInUser._id, name: loggedInUser.username };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({ token });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // verify token
  verifiedToken: (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) return res.send(false);

      jwt.verify(token, process.env.JWT_SECRET, async (err, verified) => {
        if (err) return res.send(false);
        const user = await User.findById(verified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
