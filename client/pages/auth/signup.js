import { useState } from 'react'
import axios from 'axios'
import useRequest from '../../hooks/use-request'

export default () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { errors, doRequest } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		body: {
			email,
			password,
		},
  })
  
	const onSubmit = async event => {
		event.preventDefault()

    var response = await doRequest()
    
    console.log(response)
	}

	return (
		<form onSubmit={onSubmit}>
			<h1>Signup</h1>
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
			{errors}

			<button className="btn btn-primary"> Sign Up</button>
		</form>
	)
}
