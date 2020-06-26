import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

import { errorHandler } from '@gtickets/common'
import { NotFoundError } from '@gtickets/common'

const app = express()
app.set('trust proxy', true) // nginx proxy the connection
app.use(json())
app.use(
	cookieSession({
		signed: false,
		secure: false, // because my domain is not secure (http)
		//secure: process.env.NODE_ENV !== 'test', //share cookies only with https connections
	})
)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }
