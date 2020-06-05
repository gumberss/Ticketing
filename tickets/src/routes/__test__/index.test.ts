import request from 'supertest'
import { app } from '../../app'

it('Can fetch a list of tickets', async () => {
	await createTicket()
	await createTicket()
	await createTicket()

  const response = await request(app).get('/api/tickets').send().expect(200)
  
  expect(response.body.length).toEqual(3)
})

const createTicket = async () => {
	const response = await request(app).post('/api/tickets').set('Cookie', global.signup()).send({
		title: '123',
		price: 20,
  })
}
