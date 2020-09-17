const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
//const { send } = require('process');

//  @desc   Sign up
//  @route  POST /api/v1/auth/signup
//  @access Public
exports.signUp = asyncHandler(async (req, res, next) => {
  // Get request values after JOI validation
  const { name, lastName, email, password } = req.value.body;
  // Ensure uniqueness
  const foundUser = await User.findOne({ 'local.email': email });
  if (foundUser) {
    return next(new ErrorResponse('User already exists', 401));
  }
  // Create new user
  const newUser = new User({
    method: 'local',
    name,
    lastName,
    local: {
      email,
      password,
    },
  });
  await newUser.save();
  // Send token
  res.status(201).json({ token: newUser.getSignedJwtToken() });
});

//  @desc   Sign in
//  @route  POST /api/v1/auth/signin
//  @access Public
exports.signIn = asyncHandler(async (req, res, next) => {
  res.status(200).send({ token: req.user.getSignedJwtToken() });
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.user = asyncHandler(async (req, res, next) => {
  const { id, name, lastName, status } = req.user;
  res.status(200).send({ user: { id, name, lastName, status } });
});

// 	@desc	Set status
//	@router PATCH /api/v1/auth/set-status
//	@access Private
exports.setStatus = asyncHandler(async (req, res, next) => {
  const { id: idRequest } = req.user;
  const { status: statusOld } = req.body;
  let user = await User.findOneAndUpdate(
    { _id: idRequest },
    { status: statusOld },
    {
      new: true,
      runValidators: true,
    }
  );
  const { _id: id, name, lastName, status } = user;
  res.status(200).send({ user: { id, name, lastName, status } });
});

/*  
// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return next(new ErrorResponse('There is no user with that email', 404));
    }

    // Get reset token 
    const resetToken = user.getResetPasswordToken();
    await user.save( {validateBeforeSave: false });
    res.status(200).json({
        success: true,
        data: user
    })
});

*/
