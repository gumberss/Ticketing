import { Publisher, OrderCancelledEvent, Subjects } from '@gtickets/nats-common'

export class OrderCreatedPublisher extends Publisher<OrderCancelledEvent> {
	readonly subject = Subjects.OrderCancelled
}
