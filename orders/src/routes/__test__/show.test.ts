import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import mongoose from 'mongoose'

it('Fetches the order', async () => {
	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: 'Concert',
		price: 100,
	})
	await ticket.save()

	const user = global.signup()

	const { body: order } = await request(app)
		.post('/api/orders')
		.set('Cookie', user)
		.send({ ticketId: ticket.id })
		.expect(201)

	const { body: fetchOrder } = await request(app)
		.get(`/api/orders/${order.id}`)
		.set('Cookie', user)
		.send()
    .expect(200)
    
    expect(fetchOrder.id).toEqual(order.id)
})

it('Returns an error if one user tries to fetch another users order', async () => {
	const ticket = Ticket.build({
		id: new mongoose.Types.ObjectId().toHexString(),
		title: 'Concert',
		price: 100,
	})
	await ticket.save()

	const user = global.signup()

	const { body: order } = await request(app)
		.post('/api/orders')
		.set('Cookie', user)
		.send({ ticketId: ticket.id })
		.expect(201)

	 await request(app)
		.get(`/api/orders/${order.id}`)
		.set('Cookie', global.signup())
		.send()
    .expect(401)
})