import { Request, Response } from "express";
import axios from "axios";
import { LoginRequest } from "../models/user.model";

const USER_SERVICE_URL = 'http://localhost:3773/api/v1/'

// [TODO] need to handle Cookies
export const login = async(req : Request , res : Response) =>{
    try {
      const { email, password } : LoginRequest = req.body;

      if (!email || !password) {
          res.status(400).json({ error: "Email and password are required" });
          return;
      }

      const response = await axios.post(`${USER_SERVICE_URL}login` ,
            {
                email,
                password
            }
        );
        res.json({
          success : true,
          token : response.data 
        });

      } catch (error) {
        console.log(error)
        res.status(500).json({ error: `login with USER_SERVICE error` });
      }
}
// [TODO] need to handle Cookies
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
      res.status(400).json({ error: "Required fields are missing" });
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
    res.status(500).json({ error: "Register with USER_SERVICE error" });
  }
};