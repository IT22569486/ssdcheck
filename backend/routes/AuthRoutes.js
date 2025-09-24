const express = require('express');
const router = express.Router();
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['DB_PASSWORD', 'API_SECRET', 'JWT_SECRET', 'ADMIN_PASSWORD','MONGODB_USER','MONGODB_PASS'];

for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}
const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.x5apt.mongodb.net/`;
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (username === "admin" && password === process.env.ADMIN_PASSWORD) {
        res.json({ 
            token: process.env.JWT_SECRET,
            apiKey: process.env.API_SECRET,
            dbConnection: uri
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

module.exports = router;