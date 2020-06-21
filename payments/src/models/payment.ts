import mongoose from 'mongoose'

interface PaymentAtts {
	orderId: string
	stripeId: string
}

interface PaymentDoc extends mongoose.Document {
	orderId: string
	stripeId: string
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
	build(attrs: PaymentAtts): PaymentDoc
}

const paymentSchema = new mongoose.Schema(
	{
		orderId: {
			required: true,
			type: String,
		},
		stripeId: {
			required: true,
			type: String,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id
				delete ret._id
			},
		},
	}
)

paymentSchema.statics.build = (attrs: PaymentAtts) => {
	return new Payment(attrs)
}

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
	'Payment',
	paymentSchema
)

export { Payment }
