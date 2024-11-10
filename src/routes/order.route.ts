import { Router } from "express";
import { createOrder, deleteOrder, getOrders, getOrdersByDepositorId, getOrdersById, updateOrder } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.get('/' ,getOrders)
router.get('/my/:orderId' ,authMiddleware,getOrdersById)
router.get('/my',authMiddleware,getOrdersByDepositorId)
router.get('/myaccept',authMiddleware,getOrdersByDepositorId)
router.post('/',authMiddleware,createOrder)
router.put('/:orderId',authMiddleware, updateOrder)
router.delete('/:orderId',authMiddleware,deleteOrder)

export default router