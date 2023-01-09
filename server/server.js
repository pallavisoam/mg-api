const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const sendSms = require('./twilio')
require('dotenv').config()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())

// const port = 8000

// Create users endpoint
app.post('/api/users', (req, res) => {
    const { text, phone } = req.body
    const user = {
        text,
        phone
    }
    sendSms(user.phone, user.text)

    res.status(201).send({
        message: 'Account created successfully, kindly check your phone to activate your account!',
        data: user
    })
})
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

module.exports = app
