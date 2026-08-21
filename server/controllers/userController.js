const authService = require('../services/authService');

async function getProfile(req, res, next) {
    try {
        const user = await authService.findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        return res.status(200).json({
            success: true,
            profile: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProfile
};
