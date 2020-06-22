import SignForm from '../../components/sign-form'
import Router from 'next/router'
import useRequest from '../../hooks/use-request'

export default () => {
	const { errors, doRequest } = useRequest({
		url: '/api/users/signup',
		method: 'post',
		onSuccess: () => Router.push('/'),
	})

	const onSubmit = ({ email, password }) => {
		doRequest({
				email,
				password,
			})
	}

	return (
		<>
			<SignForm errors={errors} actionName="Sign up" onSubmit={onSubmit} />
			{errors}
		</>
	)
}
