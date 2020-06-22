import { useState } from 'react'
import useRequest from '../../hooks/use-request'

const NewTicket = () => {
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const { doRequest, errors } = useRequest({
		url: '/api/tickets',
		method: 'post',
		onSuccess: ticket => console.log(ticket),
	})

	const onBlur = () => {
		const value = parseFloat(price)

		if (isNaN(value)) return

		setPrice(value.toFixed(2))
	}

	const onSubmit = event => {
		event.preventDefault()

		doRequest({
			title,
			price,
		})
	}

	return (
		<div>
			<h1> Create a ticket</h1>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="form-control"
					/>
				</div>
				<div className="form-group">
					<label>Price</label>
					<input
						className="form-control"
						onBlur={onBlur}
						value={price}
						onChange={e => setPrice(e.target.value)}
					/>
				</div>
				{errors}
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	)
}
export default NewTicket
