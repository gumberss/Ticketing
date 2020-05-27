import request from 'supertest'
import { app } from '../../app'

it('returns a 400 with an invalid email', async () => {
	return request(app)
		.post('/api/users/signin')
		.send({
			email: 'testcom',
			password: 'batman-123',
		})
		.expect(400)
})

it('fails when a email that does not exist is supplied', async () => {
	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400)
})

it('fails when an incorrect password is supplied', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'batman-123',
		})
		.expect(201)

	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: '321312123',
		})
		.expect(400)
})

it('responds with a cookie when given valid credentials', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'batman-123',
		})
		.expect(201)

	var response = await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'batman-123',
		})
    .expect(200)
    
    expect(response.get('Set-Cookie')).toBeDefined()
})
