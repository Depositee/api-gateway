import { Request, Response } from "express";
import axios from "axios";
import { REVIEW_SERVICE_PORT, REVIEW_SERVICE_URL } from "../config/config";

const REVIEW_SERVICE_FULL_URL = `${REVIEW_SERVICE_URL}:${REVIEW_SERVICE_PORT}/api`;

// Get reviews by depositeeId
export const getReviewByDepositeeId = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${REVIEW_SERVICE_FULL_URL}/reviews/depositee/${req.params.depositeeId}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "REVIEW_SERVICE error",
    });
  }
};

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      `${REVIEW_SERVICE_FULL_URL}/reviews`,
      req.body
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "REVIEW_SERVICE error",
    });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const response = await axios.put(
      `${REVIEW_SERVICE_FULL_URL}/reviews/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "REVIEW_SERVICE error",
    });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    await axios.delete(`${REVIEW_SERVICE_FULL_URL}/reviews/${req.params.id}`);
    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "REVIEW_SERVICE error",
    });
  }
};
