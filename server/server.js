const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const { checkConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
    origin: [clientUrl, 'http://127.0.0.1:5173', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error Middleware
app.use(errorHandler);

// Start server and check DB connection
app.listen(PORT, async () => {
    console.log(`🚀 Vibrant SaaS Server running on http://localhost:${PORT}`);
    const dbStatus = await checkConnection();
    if (dbStatus.connected) {
        console.log('✅ MySQL Database connected successfully!');
    } else {
        console.warn('⚠️ Warning: MySQL Database connection failed:', dbStatus.error);
        console.warn('👉 Please ensure MySQL is running and credentials in server/.env are correct.');
    }
});
