import { Router } from "express";
import { createOrder, deleteOrder, getOrders, getOrdersByDepositorId, getOrdersById, updateOrder } from "../controllers/order.controller";

const router = Router()

router.get('/' ,getOrders)
router.get('/my/:orderId' ,getOrdersById)
router.get('/my',getOrdersByDepositorId)
router.post('/',createOrder)
router.put('/:orderId', updateOrder)
router.delete('/:orderId',deleteOrder)

export default router