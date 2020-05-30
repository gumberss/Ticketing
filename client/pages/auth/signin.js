import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'
import SignForm from '../../components/sign-form'

export default () => {
	const { errors, doRequest } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		onSuccess: () => Router.push('/'),
	})

	const onSubmit = ({ email, password }) => {
		doRequest({
			body: {
				email,
				password,
			},
		})
	}

	return (
		<>
			<SignForm errors={errors} actionName="Sign in" onSubmit={onSubmit} />
			{errors}
		</>
	)
}
