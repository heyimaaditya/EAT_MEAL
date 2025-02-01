require("dotenv").config();
const mongoose = require("mongoose");

class Database {
    constructor() {
        if (!Database.instance) {
            this._connect();
            Database.instance = this; // Store instance for singleton behavior
        }
        return Database.instance;
    }

    async _connect() {
        try {
            if (!process.env.MONGO_URL) {
                throw new Error("MONGO_URL is not defined in environment variables.");
            }

            this.connection = await mongoose.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log("✅ MongoDB Connected Successfully");
        } catch (error) {
            console.error("❌ Database Connection Error:", error.message);
            process.exit(1); // Exit process with failure
        }
    }

    /**
     * Get the existing database connection instance
     * @returns {mongoose.Connection} - The database connection instance
     */
    getConnection() {
        return this.connection;
    }
}

// Export a single instance of the Database class
const databaseInstance = new Database();
Object.freeze(databaseInstance); // Ensures it remains a singleton

module.exports = databaseInstance;
