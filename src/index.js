require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
var db = require('./database.js');
const crypto = require("crypto");
var mailService = require('./mailService.js');
const path = require('path');

// Instantiating the express app
const app = express();
// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Instantiating the express-jwt middleware
const jwtMW = exjwt({
	secret: process.env.APP_TOKEN_USER_SECRET
});

/////////////////////////////////////////////////////////////////////////////////////////////
// CONSTANT LIST

const USER_SECRET = process.env.APP_TOKEN_USER_SECRET;
// Initialize Cipher Option
const ALGORITHM = 'aes-192-cbc';
const SECRET_CIPHER = 'safe-t_dijalan';
const CIPHER_SALT = '4Ld1_1337';
const CIPHER_KEY = crypto.scryptSync(SECRET_CIPHER, CIPHER_SALT, 24);
const CIPHER_IV = Buffer.alloc(16, 0); // Initialization vector.
const CIPHER_BASE = 'base64';
// Initialize Hash Option
const HASH_ALGORITHM = 'sha256';

/////////////////////////////////////////////////////////////////////////////////////////////
// LOGIN ROUTE

app.post('/api/loginUser', (req, res) => {
	const { email } = req.body;
	console.log("loginUser")

	const password = crypto.createHmac(HASH_ALGORITHM, SECRET_CIPHER).update(req.body.password).digest(CIPHER_BASE);

	db.cekLoginUser(email, password, function (err, data) {
		if (data.length === 1 && data[0].status === "2") {
			//If all credentials are correct do this
			let token = jwt.sign({
				id: data[0].id,
				name: data[0].name,
				email: data[0].email,
				phone: data[0].phone,
				citizen_id: data[0].citizen_id,
				captured_id: data[0].captured_id,
				gender: data[0].gender,
				address: data[0].address,
				status: data[0].status,
				created: data[0].created,
				updated: data[0].updated,
				user_type: "User"
			}, USER_SECRET, { expiresIn: 43210 }); // Sigining the token
			res.json({
				success: true,
				err: null,
				token
			});
		}
		else if (data.length === 1 && data[0].status === "1") {
			res.json({
				success: false,
				token: null,
				err: 'User is not validated by Admin'
			});
		}
		else if (data.length === 1 && data[0].status === "0") {
			res.json({
				success: false,
				token: null,
				err: 'Email is not verified'
			});
		}
		else {
			res.json({
				success: false,
				token: null,
				err: 'Username or password is incorrect'
			});
		}
	});
});

app.get('/api/' /* Using the express jwt MW here */, (req, res) => {
	res.send({ message: 'Welcome to WOC-Karawang API' }); //Sending some response when authenticated
});

/////////////////////////////////////////////////////////////////////////////////////////////
// API Score

app.get('/api/score', (req, res) => {
	db.getScoreAll(req.body, res);
})

app.get('/api/score/:id', (req, res) => {
	db.getScore(req.params, res);
})

app.get('/api/score/user/:id', (req, res) => {
	db.getUserScore(req.params, res);
})

app.post('/api/score', (req, res) => {
	db.newScore(req, res);
})

app.put('/api/score/:uid', (req, res) => {
	db.updateScore(req.params, res);
})

app.delete('/api/score/:uid', (req, res) => {
	db.deleteScore(req.params, res);
})

app.delete('/api/score/all/ever', (req, res) => {
	db.deleteScoreAll(req.params, res);
})

/////////////////////////////////////////////////////////////////////////////////////////////
// API Quiz

app.get('/api/quiz', (req, res) => {
	db.getQuizAll(req.body, res);
})

app.get('/api/quiz/:id', (req, res) => {
	db.getQuiz(req.params, res);
})

app.get('/api/quiz/user/:id', (req, res) => {
	db.getUserQuiz(req.params, res);
})

app.post('/api/quiz', (req, res) => {
	db.newQuiz(req, res);
})

app.delete('/api/quiz/:id', (req, res) => {
	db.deleteQuiz(req.params, res);
})

app.delete('/api/quiz/all/ever', (req, res) => {
	db.deleteQuizAll(req.params, res);
})

// Error handling 
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
		res.status(401).send(err);
	}
	else {
		next(err);
	}
});

app.get('/', (req, res) => {
	res.redirect('https://woc-karawang.netlify.com');
});

// Starting the app on PORT 3000
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => {
	// eslint-disable-next-line
	console.log(`Magic happens on port ${PORT}`);
});
