import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Check for token in cookies
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided. Please sign in or sign up first." });
        }

        const decoded = jwt.verify(token, process.env.JWT|| "default_secret_key");
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid token." });
        }

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ error: "User not found." });
        }

        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default protectRoute;

