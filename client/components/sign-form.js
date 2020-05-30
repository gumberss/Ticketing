import { useState } from 'react'

export default function SignForm({ actionName, onSubmit }) {
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')

	const submit = async event => {
		event.preventDefault()
		await onSubmit({ email, password })
	}
	return (
		<form onSubmit={submit}>
			<h1>{actionName}</h1>
			<div className="form-group">
				<label>Email Address</label>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					value={password}
					onChange={e => setPassword(e.target.value)}
					type="password"
					className="form-control"
				/>
			</div>

			<button className="btn btn-primary"> {actionName}</button>
		</form>
	)
}
