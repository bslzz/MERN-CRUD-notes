const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'Invalid Authentication' });

    jwt.verify(token, process.env.JWT_SECRET, (err, verifiedUser) => {
      if (err)
        return res
          .status(401)
          .json({ msg: 'UnAuthorized User, Access denied' });
      req.user = verifiedUser;
      next();
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
