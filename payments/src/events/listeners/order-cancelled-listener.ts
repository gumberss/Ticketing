import {
	Listener,
	OrderCancelledEvent,
	Subjects,
	OrderStatus,
} from '@gtickets/nats-common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'
import { Order } from '../../models/orders'

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	queueGroupName: string = queueGroupName
	readonly subject = Subjects.OrderCancelled

	async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
		const order = await Order.findOne({
			_id: data.id,
			version: data.version - 1,
		})

		if (!order) {
			throw new Error('Order not found')
		}

    order.set({ status: OrderStatus.Cancelled })
    
    await order.save()

		msg.ack()
	}
}
