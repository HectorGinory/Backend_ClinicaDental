import jwt from 'jsonwebtoken';
import config from './config.js';
export const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(404).json({ message: "NO_TOKEN" });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        req.token = jwt.verify(token, config.SECRET);
        next();
    }
    catch (e) {
        return res.status(401).json({ message: "NO_PERMISSION" });
    }
};
//# sourceMappingURL=services.js.map