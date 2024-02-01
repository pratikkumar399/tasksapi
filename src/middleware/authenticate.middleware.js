import jwt from 'jsonwebtoken';


function authenticateToken(req, res, next) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3VkIjoicHJhdGlrcmFpIn0.wNfICKURoEJ2n5TF8ljWk01stkUDNi6KzWqVDfkz-rw";
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.user_id;
        console.log('Decoded user_id:', userId);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
}


export { authenticateToken };