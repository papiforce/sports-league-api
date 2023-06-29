const mongoose = require("mongoose");
const logger = require("./logger");

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

async function databaseConnection() {
	try {
		const connectionString = process.env.MONGO_URI;

		await mongoose.connect(connectionString, {
			serverSelectionTimeoutMS: 5000,
		});

		logger.info("Connexion à la base de données : SUCCÈS");
	} catch (err) {
		logger.error(err);
	}
}

module.exports = databaseConnection;
