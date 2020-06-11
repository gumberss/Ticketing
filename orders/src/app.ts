import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from '@gtickets/common'
//import { createTicketRouter } from './routes/new'
//import { showTicketRouter } from './routes/show'
//import { indexTicketRouter } from './routes'
//import { updateTicketRouter } from './routes/update'

const app = express()

app.set('trust proxy', true) // nginx proxy the connection
app.use(json())
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test', //share cookies only with https connections
	})
)

app.use(currentUser)

//app.use(createTicketRouter)
//app.use(showTicketRouter)
//app.use(indexTicketRouter)
//app.use(updateTicketRouter)

app.all('*', async (req, res) => {
	throw new NotFoundError()
})

app.use(errorHandler)

export { app }