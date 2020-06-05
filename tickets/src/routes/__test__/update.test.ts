import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('Returns a 404 if the provided id does not exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString()

	await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signup())
		.send({
			title: 'My ticket',
			price: 30,
		})
		.expect(404)
})

it('Returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'My ticket',
			price: 30,
		})
		.expect(401)
})

it('Returns a 401 if the user does not own the ticket', async () => {})

it('Returns a 400 if the user provides an invalid title or price', async () => {})

it('Returns a 404 if the provided id does not exist', async () => {})

it('Updates', async () => {})
