import { Request, Response } from "express";
import axios from "axios";
import { RequestWithUser } from "../models/user.model";

const DEPOSITING_MANAGEMENT_SERVICE_URL = 'http://localhost:3000/orders'

export const getOrders = async(req : Request , res : Response) =>{
    try {
        const response = await axios.get(`${DEPOSITING_MANAGEMENT_SERVICE_URL}`)
   
        res.status(200).json({
            success : true,
            data : response.data 
        });
  
    } catch (error) {
          res.status(500).json({ 
            success : false,
            error: `get Orders failed` 
          });
    }
}

export const createOrder = async(req : RequestWithUser , res : Response) =>{
  try{
    const { 
      package_name,
      package_description,
      package_weight,
     }  = req.body;

     const user = req.user

      if (!package_description || !package_name || !package_weight || !user) {
          res.status(400).json({ 
            success : false,
            error: "Package detailed are required" 
          });
          return;
      }

      const response = await axios.post(`${DEPOSITING_MANAGEMENT_SERVICE_URL}` ,
            {
                depositorId: user.id,
                package_name: package_name,
                package_description: package_description,
                package_weight: package_weight
            }
      );

      res.status(201).json({
        success : true,
        data : response.data 
      });

  }catch (error) {
    res.status(500).json({ 
      success : false,
      error: `create Order failed` 
    });
  }
}