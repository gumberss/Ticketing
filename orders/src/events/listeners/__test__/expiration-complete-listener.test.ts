import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { natsWrapper } from '../../../nats-wrapper'
import {
	Listener,
	ExpirationCompleteEvent,
	ExpirationCompleteEventData,
	OrderStatus,
} from '@gtickets/nats-common'
import { Ticket } from '../../../models/ticket'
import { ExpirationCompleteListener } from '../expiration-complete-listener'
import { Order } from '../../../models/order'

const setup = async () => {
	const listener = new ExpirationCompleteListener(natsWrapper.client)

	const ticket = Ticket.build({
		id: mongoose.Types.ObjectId().toHexString(),
		price: 20,
		title: 'Concert',
	})
	await ticket.save()

	const order = Order.build({
		status: OrderStatus.Created,
		userId: '123',
		expiresAt: new Date(),
		ticket,
	})
	await order.save()

	const data: ExpirationCompleteEventData = {
		orderId: order.id,
	}

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	}

	return { listener, order, ticket, data, msg }
}

it('updates the order status to cancelled', async () => {
	const { listener, order, data, msg } = await setup()

	await listener.onMessage(data, msg)

	const updatedOrder = await Order.findById(order.id)

	expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('emit an OrderCancelled event', async () => {
	const { listener, order, data, msg } = await setup()

	await listener.onMessage(data, msg)

	expect(natsWrapper.client.publish).toHaveBeenCalled()

	const publishMocked = natsWrapper.client.publish as jest.Mock
	const eventDataString = publishMocked.mock.calls[0][1]
  const eventData = JSON.parse(eventDataString)
  
	expect(eventData.id).toEqual(order.id)
})

it('ack the message', async () => {
	const { listener, data, msg } = await setup()

	await listener.onMessage(data, msg)

	expect(msg.ack).toHaveBeenCalled()
})
