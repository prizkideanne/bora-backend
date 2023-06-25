require("dotenv").config();
const express = require("express");
const db = require("./models");
const routes = require("./routes");

const PORT = 8001;
const app = express();

app.use(express.json());

app.use("/api/auth", routes.auth);
app.use("/api/profile", routes.profile)
app.use("/api/blog", routes.blog);

db.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app start on localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("failed connecting to database");
    console.error(error);
  });
