const jwt = require("jwt-simple");
const User = require("../models/user");
const secret = process.env.SECRET;

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token and the name
  res.send({
    token: tokenForUser(req.user),
    name: req.user.name,
    email: req.user.email,
  });
};

exports.signup = function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // See if a user with the given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    // If a user with email does NOT exist, create and save user record
    const user = new User({
      name: name,
      email: email,
      password: password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({
        token: tokenForUser(user),
        name: user.name,
        email: user.email,
      });
    });
    // Respond to request indicating the user was created
  });
};
