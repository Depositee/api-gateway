import { Request, Response } from "express";
import axios from "axios";
import { LoginRequest } from "../models/user.model";
import { getAuthTokenFromHeader } from "../middlewares/auth.middleware";
import { USER_SERVICE_PORT, USER_SERVICE_URL } from "../config/config";

const USER_SERVICE_FULL_URL = `${USER_SERVICE_URL}:${USER_SERVICE_PORT}/api/v1/`;

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
      return;
    }

    const response = await axios.post(
      `${USER_SERVICE_FULL_URL}login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const authCookie = setCookieHeader.find((cookieStr) =>
        cookieStr.startsWith("auth=")
      );

      if (authCookie) {
        const [cookieNameValue, ...cookieOptions] = authCookie.split("; ");
        const [cookieName, cookieValue] = cookieNameValue.split("=");
        res.cookie(cookieName, cookieValue, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 604800000,
          path: "/auth",
          sameSite: "lax",
        });
      }
    }

    res.json({
      success: true,
      token: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `login with USER_SERVICE error`,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      roomNumber,
    } = req.body;

    if (!email || !password || !username || !firstName || !lastName) {
      res.status(400).json({
        success: false,
        error: "Required fields are missing",
      });
      return;
    }

    const response = await axios.post(`${USER_SERVICE_FULL_URL}register`, {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      roomNumber,
    });

    res.json({
      success: true,
      token: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Register with USER_SERVICE ${error}`,
    });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
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
      `${USER_SERVICE_FULL_URL}verify-token`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: `auth=${token}`,
        },
      }
    );
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `get User Profile with USER_SERVICE error`,
    });
  }
};

// [TODO] need to handle Cookies
export const updateSelfProfile = async (req: Request, res: Response) => {
  try {
    const response = await axios.put(`${USER_SERVICE_FULL_URL}user/update`, {
      req,
    });

    res.json({
      success: true,
      token: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Update with USER_SERVICE error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth", {
      path: "/auth",
    });
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Logout with USER_SERVICE error",
    });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {  
    const token =
      req.cookies?.auth || getAuthTokenFromHeader(req.headers.cookie);
    const id = req.params.userId
    const response = await axios.get(
      `${USER_SERVICE_FULL_URL}userid/${id}`,
      {
        headers: { Cookie: `auth=${token}` },
        withCredentials: true,
      }
    );
    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `get User Data with USER_SERVICE error`,
    });
  }
};
