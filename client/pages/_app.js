import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<>
			<Component {...pageProps} currentUser/>
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
    ...data
  }
}

export default AppComponent
