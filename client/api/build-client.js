import axios from 'axios'

export default ({ req }) => {
	//on server
	if (typeof window === 'undefined') {
		return axios.create({
			baseURL:
				'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			//http://KUBERNET-NAMESPACE.KUBERNET-SERVICE.svc.cluster.local
			headers: {
				...req.headers,
			},
		})
	}
	//on broser
	else {
		return axios.create({
			baseURL: '/',
		})
	}
}
