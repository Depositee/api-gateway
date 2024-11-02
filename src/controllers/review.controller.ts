import { Request, Response } from "express";
import axios from "axios";

const REVIEW_SERVICE_URL = 'http://localhost:3001'

export const getReviewByDepositeeId = async (req: Request, res: Response) => {
    try {
      const response = await axios.get(`${REVIEW_SERVICE_URL}/reviews/depositee/${req.params.depositeeId}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ 
        success : false,
        error: `REVIEW_SERVICE error` 
      });
    }
};
// need to implement
export const createReview = async(req : Request , res : Response) =>{
    try {
        const response = await axios.post(`${REVIEW_SERVICE_URL}/reviews` ,
            
        );
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ 
          success : false,
          error: `REVIEW_SERVICE error` 
        });
      }
}


