const db = require("../models");

module.exports = {
  async getLoggedInProfile(req, res) {
    try {
      const user = await db.User.findOne({
        where: {
          id: req.user.id,
        },
      });
      res.send({ message: "get profile success", data: user });
    } catch (error) {
      res.status(500).send({ message: "error on server"});
    }
  },
};
