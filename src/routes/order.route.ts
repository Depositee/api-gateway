import { Router } from "express";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/order.controller";

const router = Router()

router.get('/' ,getOrders)
router.post('/',createOrder)
router.put('/:orderId', updateOrder)
router.delete('/:orderId',deleteOrder)

export default router