import {
	Subjects,
	Publisher,
	ExpirationCompleteEvent,
} from '@gtickets/nats-common'

export class ExpirationCompletePublisher extends Publisher<
	ExpirationCompleteEvent
> {
	readonly subject = Subjects.expirationComplete
}
