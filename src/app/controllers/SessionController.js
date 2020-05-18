const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const User = require('../models/User');
const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'Passord does not found' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
