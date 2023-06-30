require("dotenv").config();

const express = require("express");
const { databaseConnection, logger } = require("./src/config");
const cors = require("cors");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT;

databaseConnection();

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    var options;
    if (!whiteList.indexOf(origin) !== -1) {
      options = { origin: true };
    } else {
      options = { origin: false };
    }
    callback(null, options);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", routes);

app.listen(port, () => {
  logger.info(`Serveur disponible sur le port : ${port}`);
});
