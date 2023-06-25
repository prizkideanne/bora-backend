require("dotenv").config()
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { User } = db;
const secretKey = process.env.JWT_SECRET_KEY

module.exports = {
  async register(req, res) {
    const { username, email, phoneNumber, password, confirmPassword } =
      req.body;
    try {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        res.status(400).send({ message: "Username already taken" });
        return;
      }

      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        res.status(400).send({ message: "Email already taken" });
        return;
      }

      const existingPhoneNumber = await User.findOne({
        where: { phoneNumber },
      });
      if (existingPhoneNumber) {
        res.status(400).send({ message: "Phone number already taken" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        phoneNumber,
        password: hashedPassword,
      });

      res.status(201).send({
        message: "registration success",
        data: {
          username: newUser.username,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
        },
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: "something wrong in the server", errors: error });
    }
  },

  async login(req, res) {
    const { user_identifier, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username: user_identifier },
            { email: user_identifier },
            { phoneNumber: user_identifier },
          ],
        },
      });
      const isValid = await bcrypt.compare(password, user.password);
      if (user && isValid) {
        const token = jwt.sign({id: user.id}, secretKey, {expiresIn: "1hr"})
        res.send({
          message: "login success",
          data: user,
          accessToken: token,
        });
        return;
      } else {
        res.status(400).send({
          message: "login failed, incorect identity/password",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "error on server",
        error,
      });
    }
  },
};
