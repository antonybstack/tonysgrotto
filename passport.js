const passport = require("passport"); //password is authentication middleware
const LocalStrategy = require("passport-local").Strategy; //is how were gonna be authenticating
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/user.model"); //so we can access username and password of a given user

const cookieExtractor = (req) => {
  let token = null;
  //if both exist,
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization (used whenever we want to protect endpoints of the webapp)
passport.use(
  new JwtStrategy(
    //options object
    {
      jwtFromRequest: cookieExtractor, //to extract the jwt token from the request
      secretOrKey: "tonysgrotto", //verifies if this cookie is legitimate
    },
    (payload, done) => {
      //payload is the data within the JWT token that we set
      User.findById({ _id: payload.sub }, (err, user) => {
        //if error
        if (err) return done(err, false);
        //if user is not null, return user
        if (user) return done(null, user);
        //there is not user so return false
        else return done(null, false);
      });
    }
  )
);

// authenticated local strategy using username and password (for logging in)
passport.use(
  new LocalStrategy((username, password, done) => {
    //first we check if username exists
    User.findOne({ username }, (err, user) => {
      // something went wrong with database
      if (err) return done(err);
      // there is no error, but user doesnt exist
      if (!user) return done(null, false);
      // user does exist, so we check if password is correct. Using comparePassword function from user.model.js
      user.comparePassword(password, done);
    });
  })
);
