import { Response, NextFunction } from "express";
import axios from "axios";
import { RequestWithUser } from "../models/user.model";
import { USER_SERVICE_PORT, USER_SERVICE_URL } from "../config/config";

const USER_SERVICE_VERIFY_URL = `${USER_SERVICE_URL}:${USER_SERVICE_PORT}/api/v1/verify-token`;

export function getAuthTokenFromHeader(
  cookieHeader?: string
): string | undefined {
  if (!cookieHeader) return undefined;

  const cookies = cookieHeader.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "auth") {
      return value;
    }
  }
  return undefined;
}

export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.auth || getAuthTokenFromHeader(req.headers.cookie);

    if (!token) {
      res.status(401).json({
        success: false,
        error: "No token provided",
      });
      return;
    }

    const response = await axios.post(
      USER_SERVICE_VERIFY_URL,
      {},
      {
        headers: { Cookie: `auth=${token}` },
        withCredentials: true,
      }
    );

    if (response.data && response.data.user) {
      req.user = response.data.user;
    } else {
      res.status(401).json({
        success: false,
        error: "No token provided",
      });
      return;
    }
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      res.status(401).json({
        success: false,
        error: "No token provided",
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: "Authentication failed",
    });
  }
};
