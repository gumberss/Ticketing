import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import { Order, OrderStatus } from '../../models/order'

it('Marks an order as cancelled', async () => {
	const ticket = Ticket.build({
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
		.delete(`/api/orders/${order.id}`)
		.set('Cookie', user)
		.send()
    .expect(204)
  
  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('Returns an error if one user tries to delete another users order', async () => {
	const ticket = Ticket.build({
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
		.delete(`/api/orders/${order.id}`)
		.set('Cookie', global.signup())
		.send()
    .expect(401)
})

it.todo('Emits an order cancelled event')
