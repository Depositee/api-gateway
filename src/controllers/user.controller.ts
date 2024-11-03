import { Request, Response } from "express";
import axios from "axios";
import { LoginRequest } from "../models/user.model";

const USER_SERVICE_URL = 'http://localhost:3773/api/v1/'

export const login = async(req : Request , res : Response) =>{
    try {
      const { email, password } : LoginRequest = req.body;

      if (!email || !password) {
          res.status(400).json({ 
            success : false,
            error: "Email and password are required" 
          });
          return;
      }

      const response = await axios.post(`${USER_SERVICE_URL}login` ,
            {
                email,
                password
            },
            { withCredentials : true }
        );

      const setCookieHeader = response.headers['set-cookie'];
      if (setCookieHeader) {
        const authCookie = setCookieHeader.find(cookieStr => cookieStr.startsWith("auth="));
        
        if (authCookie) {

          const [cookieNameValue, ...cookieOptions] = authCookie.split("; ");
          const [cookieName, cookieValue] = cookieNameValue.split("=");
          res.cookie(cookieName, cookieValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 604800000, 
            path: "/auth", 
            sameSite: "lax"  
          });
        }
      }
      
      res.json({
          success : true,
          token : response.data 
      });

      } catch (error) {
        res.status(500).json({ 
          success : false,
          error: `login with USER_SERVICE error` 
        });
      }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { 
      username, 
      email, 
      password, 
      firstName, 
      lastName, 
      phoneNumber, 
      roomNumber 
    } = req.body;

    if (!email || !password || !username || !firstName || !lastName) {
      res.status(400).json({ 
        success : false,
        error: "Required fields are missing" 
      });
      return;
    }

    const response = await axios.post(`${USER_SERVICE_URL}register`, {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      roomNumber
    });

    res.json({
      success: true,
      token: response.data
    });
  } catch (error) {
    res.status(500).json({ 
      success : false,
      error: "Register with USER_SERVICE error" 
    });
  }
};

// [TODO] need to handle Cookies
export const updateSelfProfile = async(req : Request , res : Response) =>{
  try { 
    const response = await axios.put(`${USER_SERVICE_URL}user/update`, {
      req
    });

    res.json({
      success: true,
      token: response.data
    });
  } catch (error) {
    res.status(500).json({ 
      success : false,
      error: "Update with USER_SERVICE error" 
    });
  }
}