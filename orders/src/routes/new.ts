import mongoose from 'mongoose'
import express, { Request, Response } from 'express'
import { requireAuth, validateRequest, NotFoundError } from '@gtickets/common'
import { body } from 'express-validator'
import { Order } from '../models/order'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.post(
	'/api/orders',
	requireAuth,
	[
		body('ticketId')
			.not()
			.isEmpty()
			/**
			 * This validation needs to be carreful, because
			 * when we make this validation, and the database
			 * of the ticket microservice changes, this validation
			 * will broken, thus, every time you change ticket
			 * microsservice, you need to check if that change
			 * doesn't impact in this microservice, and it is not
			 * a good aproach. I'll make this validation because
			 * I'ma hundread percent sure that ticketing microservice
			 * will use mongo database (learning project) by the end
			 * of the project.
			 */
			.custom((input: string) => mongoose.Types.ObjectId.isValid(input))
			.withMessage('TicketId must be provided'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
    const { ticketId } = req.body
    
    const ticket = await Ticket.findById(ticketId)

    if(!ticket){
      throw new NotFoundError()
    }

		res.send({})
	}
)

export { router as newOrderRouter }
