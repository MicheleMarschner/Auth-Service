// Imports
const passport = require('passport');
const User = require('../models/User');
// For JWT verification
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
// For local strategy
const LocalStrategy = require('passport-local').Strategy;
// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      const user = await User.findById(payload.id);
      if (!user) return done(null, false);
      done(null, user);
    }
  )
);
// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      const user = await User.findOne({ 'local.email': email });
      console.log(user);
      if (!user) return done(null, false);
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return done(null, false);
      done(null, user);
    }
  )
);
