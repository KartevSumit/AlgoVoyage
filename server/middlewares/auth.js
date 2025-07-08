import dotenv from 'dotenv';
dotenv.config();

export const auth = (req, res, next) => {
  try {
    const token =
      req.cookie?.token ||
      req.body?.token ||
      (req.header.authorization &&
        req.header.authorization.replace('Bearer ', ''));

    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'Token missing',
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in Authorization',
      error: error.message,
    });
  }
};
