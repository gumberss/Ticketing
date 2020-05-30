import axios from 'axios'

const LandingPage = ({ currentUser }) => {
	console.log(currentUser)
	return <h1>Hi :)</h1>
}

// This method from Next.js allow us to fetch some data during the server side process
LandingPage.getInitialProps = async () => {
	//on server
	if (typeof window === 'undefined') {
		const { data } = await axios.get(
			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
			//http://KUBERNET-NAMESPACE.KUBERNET-SERVICE.svc.cluster.local/PATH
			{
				headers: {
					Host: 'ticketing.dev',
				},
			}
		)
		return data
	}
	//on broser
	else {
		const { data } = await axios.get('/api/users/currentuser')
		return data
	}
}

export default LandingPage
