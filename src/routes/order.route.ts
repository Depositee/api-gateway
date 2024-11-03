import { Router } from "express";
import { createOrder, getOrders, updateOrder } from "../controllers/order.controller";

const router = Router()

router.get('/' ,getOrders)
router.post('/',createOrder)
router.put('/:orderId', updateOrder)

export default router