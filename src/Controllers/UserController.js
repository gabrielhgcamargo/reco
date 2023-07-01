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
};
