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
      payment_type,
      payment_amount
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
                package_weight: package_weight,
                payment_type : payment_type,
                payment_amount : payment_amount
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

export const updateOrder = async(req : RequestWithUser , res : Response) =>{
  try{
    const { 
      depositorId,
      package_id,
      status
    }  = req.body;

    const orderId = req.params.orderId

     const user = req.user

      if (!depositorId || !package_id || !status || !user) {
          res.status(400).json({ 
            success : false,
            error: "Package detailed are required" 
          });
          return;
      }

      const response = await axios.put(`${DEPOSITING_MANAGEMENT_SERVICE_URL}/${orderId}` ,
            {
                depositorId: depositorId,
                depositeeId : user.id,
                package_id: package_id,
                status : status
            }
      );

      res.status(201).json({
        success : true,
        data : response.data 
      });

  }catch (error) {
    res.status(500).json({ 
      success : false,
      error: `update Order failed` 
    });
  }
}

export const deleteOrder = async(req : Request , res : Response) =>{
  try{
    const orderId = req.params.orderId
    const response = await axios.delete(`${DEPOSITING_MANAGEMENT_SERVICE_URL}/${orderId}`);

      res.status(201).json({
        success : true,
        data : response.data 
      });

  }catch (error) {
    res.status(500).json({ 
      success : false,
      error: `delete Order failed` 
    });
  }
}