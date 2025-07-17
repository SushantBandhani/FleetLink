const mongoose = require("mongoose")

async function connectTodb() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("✅ Connection established");
    }
    catch (err) {
        console.error("❌ Error connecting to database:", err);
        process.exit(1);
    }
}


mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB Server");
});
mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
});
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
});

module.exports = { connectTodb }