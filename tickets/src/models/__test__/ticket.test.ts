import { Ticket } from '../ticket'

it('Implements optimistic concurrency control', async (done) => {
	const ticket = Ticket.build({
		title: 'Concert',
		price: 100,
		userId: '123',
	})
	await ticket.save()

	const firstInstance = await Ticket.findById(ticket.id)
	const secondInstance = await Ticket.findById(ticket.id)

	firstInstance!.set({ price: 10 })
	secondInstance!.set({ price: 15 })

	await firstInstance!.save()
	try {
		await secondInstance!.save()
	} catch (err) {
    return  done()
  }

  throw new Error('The Optimistic Concurrency Control did not work')
})
