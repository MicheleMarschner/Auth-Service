// Imports
const express = require('express');
const {
  validateBody,
  schemas: { authSchema, loginSchema },
} = require('../utils/validation');
const passport = require('passport');
const passportConfig = require('../passport/passport-config');
// Passport strategies assignment
const passportJWT = passport.authenticate('jwt', { session: false });
const passportLocal = passport.authenticate('local', { session: false });
// Import controllers
const { signUp, signIn, user, setStatus } = require('../controllers/auth');
// Create router from express
const router = express.Router();
// Routes mapping
router.route('/signup').post(validateBody(authSchema), signUp);
router.route('/signin').post(validateBody(loginSchema), passportLocal, signIn);
router.route('/user').get(passportJWT, user);
router.route('/set-status').patch(passportJWT, setStatus);
// Export module
module.exports = router;
