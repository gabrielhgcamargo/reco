const User = require("../Models/User");

module.exports = {
  async createUser(req, res) {
    try {
      const { email, name, password } = req.body;

      const emailAlreadyExists = await User.findOne({
        email,
      });

      if (emailAlreadyExists)
        return res.status(409).send({
          message: "Email already exists.",
        });

      const createdUser = await User.create({
        email,
        name,
        password,
      });

      return res.status(201).json({
        message: "User created successfully",
        data: createdUser,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(400).json({
        message: "Failed to create user : " + error,
      });
    }
  },

  async listAllUsers(req, res) {
    try {
      const allUsers = await User.find();

      return res.status(200).send({
        message: "All users found",
        data: allUsers,
      });
    } catch (error) {
      console.error("Error in list all users:", error);
      return res.status(400).json({
        message: "Failed to list all users : " + error,
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const emailExists = await User.findOne({
        email,
      });

      if (!emailExists)
        return res.status(404).send({
          message: "This email does not exist.",
        });

      const correctPassword = await User.findOne({
        password,
      }).where({
        email,
      });

      if (!correctPassword)
        return res.status(401).send({
          message: "Incorrect password.",
        });

      return res.status(200).send({
        data: correctPassword,
      });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(400).json({
        message: "Failed to login : " + error,
      });
    }
  },

  async preferences(req, res) {
    const { preferences } = req.body;
    const { userEmail } = req.params;

    try {
      const user = await User.findOne({ email: userEmail });

      if (!user) return res.status(404).json({ message: "User not found." });

      user.preferences = preferences;

      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error in add/change user's preferences:", error);
      return res.status(400).json({
        message: "Error in add/change user's preferences: " + error,
      });
    }
  },
};
