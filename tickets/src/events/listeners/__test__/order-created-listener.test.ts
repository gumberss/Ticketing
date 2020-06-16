import { Message } from 'node-nats-streaming'
import { OrderCreatedListener } from '../order-created-listener'
import { natsWrapper } from '../../../nats-wrapper'
import { Ticket } from '../../../models/ticket'
import { OrderCreatedEvent, OrderStatus } from '@gtickets/nats-common'
import mongoose from 'mongoose'
const setup = async () => {
	const listener = new OrderCreatedListener(natsWrapper.client)

	const ticket = Ticket.build({
		title: 'Concert',
		price: 120,
		userId: '123',
	})

	await ticket.save()

	const data: OrderCreatedEvent['data'] = {
		id: mongoose.Types.ObjectId().toHexString(),
		status: OrderStatus.Created,
		userId: 'string',
		expiredAt: 'string',
		version: 0,
		ticket: {
			id: ticket.id,
			price: ticket.price,
		},
	}

	//@ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	}

	return { listener, ticket, data, msg }
}

it('Sets the userId of the ticket', async () => {
	const { listener, ticket, data, msg } = await setup()

	await listener.onMessage(data, msg)

	const updatedTicket = await Ticket.findById(ticket.id)

	expect(updatedTicket!.orderId).toEqual(data.id)
})

it('acks the message', async () => {
  const { listener, data, msg } = await setup()

	await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})
