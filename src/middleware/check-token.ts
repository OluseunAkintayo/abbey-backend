import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, RequestHandler } from 'express';
import dayjs from 'dayjs';
dotenv.config();

export interface RequestExt extends Request {
  user: {
    id: string;
    email: string;
    exp: number;
    iat: number;
  } | null;
}

const jwtKey = process.env.JWT_SECRET;

if (!jwtKey) {
  throw new Error('JWT Key is not defined');
}

export const check: RequestHandler = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, jwtKey) as { id: string; email: string; exp: number; iat: number };

      if (dayjs.unix(decodedToken.exp).isAfter(dayjs())) {
        (req as RequestExt).user = decodedToken;
        next();
      } else {
        res.status(401).json({ status: 0, message: "Token expired" });
      }
    } catch (err) {
      res.status(403).json({ status: 0, message: "Unauthorized access: invalid token" });
    }
  } else {
    res.status(401).json({ status: 0, message: "Unauthorized access: token not found" });
  }
}

export const checkToken: RequestHandler = (req, res, next) => {
  check(req, res, () => {
    const user = (req as RequestExt).user;
    if (user?.id) return next();
    res.status(403).json({
      success: false,
      message: "Unauthorized access: provided token not valid for specified user"
    });
  });
}
