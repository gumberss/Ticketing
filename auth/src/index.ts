import express from 'express'
import { json } from 'body-parser'

const app = express()
app.use(json())

app.get('/api/users/currentuser', (req, resp) => {
	resp.send('hi!')
})

app.listen(3000, () => console.log('Listening on port 3000!!'))
