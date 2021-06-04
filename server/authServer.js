require('dotenv').config()

const express = require('express');
const app = express();

app.use(express.json())

const jwt = require('jsonwebtoken')

app.post('/token', (req, res) => {
	const token = req.body.token
})

app.post('/login', (req, res) => {

	// Authenticate User
	const username = req.body.username;
	const user = {name: username};

	const accessToken = generateAccessToken(user)
	const refreshToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
	res.json({accessToken: accessToken, refreshToken: refreshToken});
})

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
}

app.listen(4000)
