import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Header currentUser={currentUser} />
			<Component {...pageProps} currentUser={currentUser} />
		</>
	)
}
// This method from Next.js allow us to fetch some data during the server side process
AppComponent.getInitialProps = async ({ Component, ctx }) => {
	const client = buildClient(ctx)

	const { data } = await client.get('/api/users/currentuser')

	let pageProps = {}
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx)
	}

	return {
		pageProps,
		...data,
	}
}

export default AppComponent
