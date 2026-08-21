const authService = require('../services/authService');

async function register(req, res, next) {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !fullName.trim()) {
            return res.status(400).json({ success: false, message: 'Full name is required.' });
        }
        if (!email || !email.trim()) {
            return res.status(400).json({ success: false, message: 'Email address is required.' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
        }

        const { user, token } = await authService.registerUser({ fullName, email, password });

        return res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            user,
            token
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY' || error.message.includes('already exists')) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email address already exists. Please sign in instead.'
            });
        }
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        const { user, token } = await authService.loginUser({ email, password });

        return res.status(200).json({
            success: true,
            message: 'Login successful.',
            user,
            token
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message || 'Invalid credentials.'
        });
    }
}

async function getCurrentUser(req, res, next) {
    try {
        const user = await authService.findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                createdAt: user.created_at
            }
        });
    } catch (error) {
        next(error);
    }
}

async function logout(req, res) {
    return res.status(200).json({
        success: true,
        message: 'Logged out successfully.'
    });
}

module.exports = {
    register,
    login,
    getCurrentUser,
    logout
};
