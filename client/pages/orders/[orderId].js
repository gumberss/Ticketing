import { useEffect, useState } from 'react'

const OrderShow = ({ order }) => {
	const [timeLeft, setTimeleft] = useState('')

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

	return <div>Time left to pay: {timeLeft} seconds</div>
}

OrderShow.getInitialProps = async (context, client) => {
	const { orderId } = context.query

	const { data } = await client.get(`/api/orders/${orderId}`)

	return { order: data }
}

export default OrderShow
