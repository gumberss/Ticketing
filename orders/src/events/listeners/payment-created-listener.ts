import {
	Listener,
	PaymentCreatedEvent,
	Subjects,
	OrderStatus,
} from '@gtickets/nats-common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { Order } from '../../models/order'
import { OrderUpdatedPublisher } from '../publishers/order-updated-publisher'
import { natsWrapper } from '../../nats-wrapper'

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated
	queueGroupName: string = queueGroupName
	async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
		const order = await Order.findById(data.orderId)

		if (!order) {
			throw new Error('Order not found')
		}

		order.set({ status: OrderStatus.Complete })
    await order.save()
    
		await new OrderUpdatedPublisher(natsWrapper.client).publish({
			id: order.id,
			status: order.status,
			version: order.version
		})

    msg.ack()
	}
}
