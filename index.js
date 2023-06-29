require("dotenv").config();

const express = require("express");
const { databaseConnection, logger } = require("./src/config");
const cors = require("cors");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT;

databaseConnection();

app.use(express.json());
app.use(cors());
app.use("/api", routes);

app.listen(port, () => {
  logger.info(`Serveur disponible sur le port : ${port}`);
});
