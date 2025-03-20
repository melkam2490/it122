import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();  // Load environment variables from .env
const app = express();
const port = process.env.PORT || 3000;
// Middleware
app.use(express.json());
// Simple Route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
