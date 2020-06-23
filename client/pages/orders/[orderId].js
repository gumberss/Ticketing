const OrderShow = ({ order }) => {
	const milisecondsLeft = new Date(order.expiresAt) - new Date()

	return <div>{milisecondsLeft / 1000} seconds until order expires</div>
}

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query

	const { data } = await client.get(`/api/orders/${orderId}`)

  console.log('h1')

	return { order: data }
}

export default OrderShow
