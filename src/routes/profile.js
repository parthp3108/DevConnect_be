const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser, // Ensure this key exists
    });
  } catch (err) {
    console.error("Error in /profile/edit:", err);
    res.status(400).json({ message: "Failed to update profile", error: err.message });
  }
});


module.exports = profileRouter;