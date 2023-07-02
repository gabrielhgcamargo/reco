const User = require("../Models/User");

module.exports = {
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
};
