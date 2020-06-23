import {
	Listener,
	OrderCancelledEvent,
	OrderCreatedEvent,
	Subjects,
	OrderStatus,
} from '@gtickets/nats-common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { Ticket } from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher'

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled
	queueGroupName: string = queueGroupName

	async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
		const ticket = await Ticket.findById(data.ticket.id)

		if (!ticket) {
			throw new Error('Ticket not found')
		}

		//ts '?' check dont work very well with null, so we will update with undefined
		ticket.set({ orderId: undefined })

		await ticket.save()
		await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
			userId: ticket.userId,
			version: ticket.version,
			orderId: ticket.orderId,
			price: ticket.price,
			title: ticket.title
    })

    msg.ack()
	}
}
