import express, { Request, Response } from 'express'
import { requireAuth, NotFoundError, NotAuthorizedError } from '@gtickets/common'
import { Order, OrderStatus } from '../models/order'

const router = express.Router()

/**
 * Delete is not the correct method, because 
 * we're actually not deleting the data, we 
 * are updating it. Probably the put or patch 
 * method fit better
 */
router.delete(
	'/api/orders/:orderId',
	requireAuth,
	async (req: Request, res: Response) => {
		const { orderId } = req.params

		const order = await Order.findById(orderId)

		if(!order){
			throw new NotFoundError()
		}

		if(order.userId !== req.currentUser!.id){
			throw new NotAuthorizedError()
		}

		order.status = OrderStatus.Cancelled

		res.send(order)
	}
)

export { router as deleteOrderRouter }
