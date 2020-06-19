import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { natsWrapper } from '../../../nats-wrapper'
import {
	Listener,
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
		orderId: mongoose.Types.ObjectId().toHexString(),
	}

	// @ts-ignore
	const msg: Message = {
		ack: jest.fn(),
	}

	return { listener, data, msg }
}
