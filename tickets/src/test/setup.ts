import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
	namespace NodeJS {
		interface Global {
			signup(): string[]
		}
	}
}

let mongo: any

beforeAll(async () => {
	process.env.JWT_KEY = 'lalapo'
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

	mongo = new MongoMemoryServer()
	const mongoUri = await mongo.getUri()

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
})

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections()

	for (let collection of collections) {
		await collection.deleteMany({})
	}
})

afterAll(async () => {
	await mongo.stop()
	await mongoose.connection.close()
})

// probably it is not the best way I think the best way is saparate
// this code in another file and import it in the test files that
//require it, but I'm just making a test
global.signup = () => {
	const payload = {
		id: '123',
		email: 'test@test.com',
	}

	const token = jwt.sign(payload, process.env.JWT_KEY!)

	const session = { jwt: token }

	const sessionJSON = JSON.stringify(session)

	const base64 = Buffer.from(sessionJSON).toString('base64')

	return [`express:sess=${base64}`]
}
