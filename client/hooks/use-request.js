import axios from 'axios'
import { useState } from 'react'

export default ({ url, method, onSuccess }) => {
	const [errors, setErrors] = useState(null)

	const doRequest = async (body) => {
		try {
			const response = await axios[method](url, body || {})

			setErrors(null)

			onSuccess && onSuccess(response.data)

			return response.data
		} catch (err) {
			console.log(err)
			setErrors(
				<div className="alert alert-danger">
					<h4>Oops...</h4>
					<ul className="my-0">
						{err.response.data.errors.map(err => (
							<li key={err.message}>{err.message}</li>
						))}
					</ul>
				</div>
			)
		}
	}

	return { errors, doRequest }
}
