import { Request, Response } from "express";
import axios from "axios";

const USER_SERVICE_URL = 'http://localhost:3773/api/v1/'


export const login = async(req : Request , res : Response) =>{
    try {
      const { email, password } = req.body;

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
        res.json(response.data);
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: `login with USER_SERVICE error` });
      }
}