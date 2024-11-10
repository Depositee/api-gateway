import { Request, Response } from "express";
import axios from "axios";
import { RequestWithUser } from "../models/user.model";
import {
  DEPOSITING_MANAGEMENT_SERVICE_URL,
  DEPOSITING_MANAGEMENT_SERVICE_PORT,
} from "../config/config";

const DEPOSITING_MANAGEMENT_SERVICE_FULL_URL = `${DEPOSITING_MANAGEMENT_SERVICE_URL}:${DEPOSITING_MANAGEMENT_SERVICE_PORT}/orders`;

export const getOrders = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${DEPOSITING_MANAGEMENT_SERVICE_FULL_URL}`
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: `get Orders failed`,
    });
  }
};

export const getOrdersById = async(req : Request , res : Response) =>{
  const orderId = req.params.orderId
  try {
      const response = await axios.get(`${DEPOSITING_MANAGEMENT_SERVICE_FULL_URL}/${orderId}`)
      res.status(200).json({
          success : true,
          data : response.data
      });

  } catch (error) {
    console.log(error)
        res.status(500).json({ 
          success : false,
          error: `get Order with id ${orderId} failed` 
        });
  }
}

export const getOrdersByDepositorId = async(req : RequestWithUser , res : Response) =>{
  try {
      const user = req.user
      const response = await axios.get(`${DEPOSITING_MANAGEMENT_SERVICE_FULL_URL}/my/${user?.id}`)
 
      res.status(200).json({
          success : true,
          data : response.data 
      });

  } catch (error) {
        res.status(500).json({ 
          success : false,
          error: `get Orders By depositorId failed` 
        });
  }
}

export const createOrder = async (req: RequestWithUser, res: Response) => {
  try {
    const {
      package_name,
      package_description,
      package_weight,
      payment_type,
      payment_amount,
    } = req.body;

    const user = req.user;

    if (!package_description || !package_name || !package_weight || !user) {
      res.status(400).json({
        success: false,
        error: "Package detailed are required",
      });
      return;
    }

    const response = await axios.post(
      `${DEPOSITING_MANAGEMENT_SERVICE_FULL_URL}`,
      {
        depositorId: user.id,
        package_name: package_name,
        package_description: package_description,
        package_weight: package_weight,
        payment_type: payment_type,
        payment_amount: payment_amount,
      }
    );

    res.status(201).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `create Order failed`,
    });
  }
};

export const updateOrder = async (req: RequestWithUser, res: Response) => {
  try {
    const {
      depositorId,
      package_id,
      package_name,
      package_description,
      package_weight,
      payment_type,
      payment_amount,
      status,
    } = req.body;

    const orderId = req.params.orderId;

    const user = req.user;

    if (
      !depositorId ||
      !package_id ||
      !status ||
      !user ||
      !package_name ||
      !package_description ||
      !package_weight ||
      !payment_type ||
      !payment_amount
    ) {
      res.status(400).json({
        success: false,
        error: "Package detailed are required",
      });
      return;
    }

    const response = await axios.put(
      `${DEPOSITING_MANAGEMENT_SERVICE_FULL_URL}/${orderId}`,
      {
        depositorId: depositorId,
        depositeeId: user.id,
        package_id: package_id,
        package_name: package_name,
        package_description: package_description,
        package_weight: package_weight,
        payment_type: payment_type,
        payment_amount: payment_amount,
        status: status,
      }
    );

    res.status(201).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `update Order failed`,
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.orderId;
    const response = await axios.delete(
      `${DEPOSITING_MANAGEMENT_SERVICE_FULL_URL}/${orderId}`
    );

    res.status(201).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `delete Order failed`,
    });
  }
};
