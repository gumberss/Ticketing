import {
	Listener,
	ExpirationCompleteEvent,
	Subjects,
	ExpirationCompleteEventData,
  OrderStatus,
} from '@gtickets/nats-common'
import { queueGroupName } from './queue-group-name'
import { Message } from 'node-nats-streaming'
import { Order } from '../../models/order'

export class ExpirationCompleteListener extends Listener<
	ExpirationCompleteEvent
> {
	queueGroupName = queueGroupName
	readonly subject = Subjects.expirationComplete

	async onMessage(data: ExpirationCompleteEventData, msg: Message) {
		const order = await Order.findById(data.orderId)

		if (!order) {
			throw new Error('Order not found')
    }
    
    order.set({
      status: OrderStatus.Cancelled
    })
	}
}
