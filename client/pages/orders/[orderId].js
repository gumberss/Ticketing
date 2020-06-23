import { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'

const OrderShow = ({ order, currentUser }) => {
	const [timeLeft, setTimeleft] = useState(0)

	useEffect(() => {
		const findTimeLeft = () => {
			const milisecondsLeft = new Date(order.expiresAt) - new Date()

			setTimeleft(Math.round(milisecondsLeft / 1000))
		}

		findTimeLeft()

		const timerId = setInterval(findTimeLeft, 1000)

		/**
		 * When a function is returned from UseEffect, that function will be
		 * invoked when you navigate away from this component (always) or if
		 * the component is going to be rerendered (only if the [] has
		 * something and it was updated).
		 */
		return () => {
			clearInterval(timerId)
		}
	}, [])

	if (timeLeft <= 0) {
		return <div> Order expired</div>
	}

	return (
		<div>
			Time left to pay: {timeLeft} seconds
			<StripeCheckout
				token={token => console.log(token)}
				stripeKey={process.env.STRIPE_PUBLIC_KEY}
				amount={order.ticket.price * 100}
				email={currentUser.email}
			/>
		</div>
	)
}

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query

	const { data } = await client.get(`/api/orders/${orderId}`)

	return { order: data }
}

export default OrderShow
