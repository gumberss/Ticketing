import {
	Listener,
	Subjects,
	TicketUpdatedEvent,
	TicketUpdateEventData,
} from '@gtickets/nats-common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { Ticket } from '../../models/ticket'

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
	readonly subject = Subjects.TicketUpdated
	readonly queueGroupName: string = queueGroupName
	async onMessage(data: TicketUpdateEventData, msg: Message) {
		const ticket = await Ticket.findOne({
			_id: data.id,
			version: data.version - 1,
		})

		if (!ticket) {
			throw new Error('Ticket not found')
		}

		const { title, price } = data

		ticket.set({ title, price })

		ticket.save()

		msg.ack()
	}
}
