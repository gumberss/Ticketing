import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/orders'
import { OrderStatus } from '@gtickets/nats-common'
import { stripe } from '../../stripe'

jest.mock('../../stripe')

it('returns a 404 when putchasing an order thet does not exists', async () => {
	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signup())
		.send({
			token: '123',
			orderId: mongoose.Types.ObjectId().toHexString(),
		})
		.expect(404)
})

it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
	const order = Order.build({
		id: mongoose.Types.ObjectId().toHexString(),
		userId: mongoose.Types.ObjectId().toHexString(),
		version: 0,
		price: 12,
		status: OrderStatus.Created,
	})
	await order.save()

	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signup())
		.send({
			token: '123',
			orderId: order.id,
		})
		.expect(401)
})

it('returns a 400 when purchasing a cancelled order', async () => {
	const userId = mongoose.Types.ObjectId().toHexString()

	const order = Order.build({
		id: mongoose.Types.ObjectId().toHexString(),
		userId: userId,
		version: 0,
		price: 12,
		status: OrderStatus.Cancelled,
	})
	await order.save()

	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signup(userId))
		.send({
			token: '123',
			orderId: order.id,
		})
		.expect(400)
})

it('returns a 204 with valid inputs', async () => {
	const userId = mongoose.Types.ObjectId().toHexString()

	const order = Order.build({
		id: mongoose.Types.ObjectId().toHexString(),
		userId: userId,
		version: 0,
		price: 12,
		status: OrderStatus.Created,
	})
	await order.save()

	await request(app)
		.post('/api/payments')
		.set('Cookie', global.signup(userId))
		.send({
			token: 'tok_visa',
			orderId: order.id,
		})
    .expect(201)
    
    
    const stripeAction = (stripe.charges.create as jest.Mock)
    const chargeOptions = stripeAction.mock.calls[0][0]
    expect(chargeOptions.source).toEqual('tok_visa')
    expect(chargeOptions.amount).toEqual(12 * 100)
    expect(chargeOptions.currency).toEqual('usd')
})
