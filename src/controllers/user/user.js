import User from "../../models/user/user.js";
import ApiError from "../../utils/error/ApiError.js";
import { asyncHandler } from "../../utils/error/asynchandler.js";

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ApiError("Unauthorized user", 401));
  }

  const userData = await User.findById(req.user?._id).select(
    "-password -refreshToken"
  );

  if (!userData) {
    return next(new ApiError("User is not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    user: userData,
  });
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  if (req.body.email && req.body.email !== user.email) {
    return next(new ApiError("Email cannot be updated", 400));
  }
  // Update user details
  user.name = req.body.name || user.name;

  if (req.body.password) {
    user.password = req.body.password; // This triggers pre("save") for hashing
  }

  await user.save(); // Save to trigger middleware

  user.password = undefined;
  return res.status(200).json({
    success: true,
    message: "User details updated successfully!",
    user,
  });
});