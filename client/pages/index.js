import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are signed in</h1>
	) : (
		<h1>You are NOT signed in</h1>
	)
}

// This method from Next.js allow us to fetch some data during the server side process
LandingPage.getInitialProps = async context => {
	const client = buildClient(context)

	const { data } = await client.get('/api/users/currentuser')

	return data
}

export default LandingPage
