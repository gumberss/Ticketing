import { Subjects, Publisher, PaymentCreatedEvent } from '@gtickets/nats-common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
	readonly subject = Subjects.PaymentCreated
}
