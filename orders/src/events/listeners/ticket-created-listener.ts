import {
	Listener,
	TicketCreatedEvent,
	Subjects,
	TicketCreatedEventData,
} from '@gtickets/nats-common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { Ticket } from '../../models/ticket'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
	readonly subject = Subjects.TicketCreated

	queueGroupName: string = queueGroupName

	async  onMessage(data: TicketCreatedEventData, msg: Message): void {
		const { id, title, price } = data

		const ticket = Ticket.build({
      id,
			title,
			price,
		})

		await ticket.save()

		msg.ack()
	}
}
