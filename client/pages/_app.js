import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Header currentUser={currentUser} />
			<div className="container">
				<Component {...pageProps} currentUser={currentUser} />
			</div>
		</>
	)
}
// This method from Next.js allow us to fetch some data during the server side process
AppComponent.getInitialProps = async ({ Component, ctx }) => {
	const client = buildClient(ctx)

	const { data: currentUser } = await client.get('/api/users/currentuser')

	let pageProps = {}
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx, client, currentUser)
	}

	return {
		pageProps,
		...currentUser,
	}
}

export default AppComponent
