import { Publisher, Subjects, OrderCreatedEvent } from '@gtickets/nats-common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
	readonly subject = Subjects.OrderCreated
}
