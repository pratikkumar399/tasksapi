import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants.js';


function authenticateToken(req, res, next) {
    const token = JWT_SECRET;
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.user_ud;
        console.log('Decoded user_id:', userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
}


export { authenticateToken };
