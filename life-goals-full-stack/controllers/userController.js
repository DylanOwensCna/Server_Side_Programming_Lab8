const User = require('../models/users');

exports.user_create_post = function(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.send('User created successfully');
  });
};
