import { COOKIE_OPTIONS } from "../../../constants.js";
import User from "../../models/user/user.js";
import ApiError from "../../utils/error/ApiError.js";
import { asyncHandler } from "../../utils/error/asynchandler.js";

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  if (!email || !password) {
    return next(new ApiError("All fields are required", 400));
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) return next(new ApiError("User not found", 400));

  const isValidPassword = await existingUser.isPasswordCorrect(password);

  if (!isValidPassword) {
    return next(new ApiError("Wrong password", 400));
  }

  const access_token = await existingUser.generateAccessToken();
  const refresh_token = await existingUser.generateRefreshToken();

  // Convert Mongoose document to plain object
  const sanitizedUser = existingUser.toObject();
  sanitizedUser.password = undefined;
  sanitizedUser.createdAt = undefined;
  sanitizedUser.updatedAt = undefined;
  sanitizedUser.__v = undefined;


  res
    .cookie("access_token", access_token, {
      ...COOKIE_OPTIONS,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
    })
    .cookie("refresh_token", refresh_token, {
      ...COOKIE_OPTIONS,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    })
    .status(200)
    .json({
      success: true,
      message: "Login Successfull",
      user: sanitizedUser,
      token: refresh_token
    });
});

export const logout = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    // Check if user was found
    if (!user) {
      return next(new ApiErrorResponse("User not found", 404)); // Return 404 if no user found
    }

    res
      .cookie("access_token", "", { ...COOKIE_OPTIONS, maxAge: 0 })
      .cookie("refresh_token", "", { ...COOKIE_OPTIONS, maxAge: 0 })
      .status(200)
      .json({ success: true, message: "Logout successfully!" });
  } catch (error) {
    console.log(`Error in logout: ${error.message}`);
    return next(new ApiErrorResponse("Error in logout", 500));
  }
});
