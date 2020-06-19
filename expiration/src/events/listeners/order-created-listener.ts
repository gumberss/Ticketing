import {
	Listener,
	OrderCreatedEvent,
	Subjects,
} from '@gtickets/nats-common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import { expirationQueue } from '../../queues/expiration-queue'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated
	queueGroupName = queueGroupName
	async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
		const delay = new Date(data.expiredAt).getTime() - new Date().getTime()

		console.log('Waiting the many miliseconds to process the job: ', delay)

		await expirationQueue.add(
			{
				orderId: data.id,
			},
			{
				delay,
			}
		)

		msg.ack()
	}
}
