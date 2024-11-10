import { Request, Response } from "express";

import { paymentClient, balanceClient } from "../clients/paymentClient";

export const GetAllPaymentByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params; // Get the userId from the request params

  try {
    await paymentClient.GetAllPaymentByUserId(
      { id: userId },
      (error: any, response: any) => {
        if (error) {
          return res.status(500).json({
            success: false,
            error: "Failed to retrieve payments",
          });
        }

        res.status(200).json({
          success: true,
          data: response,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
    });
  }
};

export const GetBalanceByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  // Validate input
  if (!userId) {
    res.status(400).json({
      success: false,
      error: "userId is required.",
    });
  }

  try {
    await balanceClient.GetBalanceByUserId(
      { id: userId },
      (error: any, response: any) => {
        if (error) {
          console.error("GetBalanceByUserId gRPC error:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to retrieve balance.",
          });
        }

        res.status(200).json({
          success: true,
          data: response,
        });
      }
    );
  } catch (error) {
    console.error("GetBalanceByUserId unexpected error:", error);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred.",
    });
  }
};

export const AddBalance = async (req: Request, res: Response) => {
  const { userId, amount, currency } = req.body;

  // Validate input
  if (!userId || !amount || !currency) {
    res.status(400).json({
      success: false,
      error: "userId, amount, and currency are required.",
    });
  }

  try {
    await balanceClient.AddBalance(
      { userId, balance: amount, currency },
      (error: any, response: any) => {
        if (error) {
          console.error("AddBalance gRPC error:", error);
          return res.status(500).json({
            success: false,
            error: "Failed to add balance.",
          });
        }

        res.status(200).json({
          success: true,
          data: response,
        });
      }
    );
  } catch (error) {
    console.error("AddBalance unexpected error:", error);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred.",
    });
  }
};
