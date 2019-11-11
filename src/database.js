const express = require('express');
const bodyParser = require('body-parser');
var mailService = require('./mailService.js');
const Client = require('mariasql');
const c = new Client({
	host: process.env.APP_DATABASE_HOST,
	user: process.env.APP_DATABASE_USER,
	password: process.env.APP_DATABASE_PASSWORD,
	db: process.env.APP_DATABASE_DB
});

module.exports = {

	cekLoginUser: function (email, pass, callback) {
		var req = [email, pass];
		c.query("SELECT * FROM data_user WHERE email=? AND password=? AND id LIKE 'U%'", req, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			if (rows.info.numRows !== '0') {
				rows.forEach(function (items) {
					data.push({
						id: items[0],
						name: items[2],
						email: items[3],
						phone: items[4],
						citizen_id: items[5],
						captured_id: items[6],
						gender: items[7],
						address: items[8],
						status: items[9],
						created: items[10],
						updated: items[11]
					});
				});
			}
			callback(err, data);
		});
		c.end();
	},
	getScoreAll: function (req, res) {
		c.query('SELECT * FROM `data_score` ORDER BY `id`', null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					user_id: items[1],
					course_id: items[2],
					score: items[3],
					duration: items[4],
					created: items[5],
					updated: items[6]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	getScore: function (req, res) {
		c.query("SELECT * FROM `data_score` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					user_id: items[1],
					course_id: items[2],
					score: items[3],
					duration: items[4],
					created: items[5],
					updated: items[6]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	getUserScore: function (req, res) {
		c.query("SELECT * FROM `data_score` WHERE user_id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					user_id: items[1],
					course_id: items[2],
					score: items[3],
					duration: items[4],
					created: items[5],
					updated: items[6]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	newScore: function (req, res) {
		const waktu = new Date().toISOString();
		var request = [req.body.user_id, req.body.course_id, req.body.score, req.body.duration, waktu, waktu];
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("INSERT INTO `data_score` (`user_id`, `course_id`, `score`, `duration`, `created`, `updated`) VALUES (?, ?, ?, ?, ?, ?)", request, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Score has recorded successfully",
				success: true
			});
		});
		c.end();
	},
	updateScore: function (req, score, res) {
		const waktu = new Date().toISOString();
		var request = [score, waktu, req.uid]
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("UPDATE `data_score` SET `score`=?, `updated`=? WHERE `user_id`=?", request, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Score has updated successfully",
				success: true
			});
		});
		c.end();
	},
	deleteScore: function (req, res) {
		var request = [req.uid]
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("DELETE FROM `data_score` WHERE user_id=?", [req.uid], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Score has deleted successfully",
				success: true
			});
		});
		c.end();
	},
	deleteScoreAll: function (req, res) {
		c.query("DELETE FROM `data_score`", null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "All Score has deleted successfully :[",
				success: true
			});
		});
		c.end();
	},
	getQuizAll: function (req, res) {
		c.query('SELECT * FROM `data_quiz` ORDER BY `id`', null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					question: items[1],
					ans1: items[2],
					ans2: items[3],
					ans3: items[4],
					ans4: items[5]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	getQuiz: function (req, res) {
		c.query("SELECT * FROM `data_quiz` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			var data = [];
			rows.forEach(function (items) {
				data.push({
					id: items[0],
					question: items[1],
					ans1: items[2],
					ans2: items[3],
					ans3: items[4],
					ans4: items[5]
				});
			});
			if (data.length < 1) {
				res.status(404).send('Data not found.');
			} else {
				res.json(data);
			}
		});
		c.end();
	},
	newQuiz: function (req, res) {
		var request = [req.body.id, req.body.question, req.body.ans1, req.body.ans2, ans3, ans4];
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("INSERT INTO `data_quiz` (`id`, `question`, `ans1`, `ans2`, `ans3`, `ans4`) VALUES (?, ?, ?, ?, ?, ?)", request, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Quiz has recorded successfully",
				success: true
			});
		});
		c.end();
	},
	deleteQuiz: function (req, res) {
		var request = [req.id]
		if (request.includes(undefined) || request.includes("")) {
			res.send({ message: 'Bad Request: Parameters cannot empty.' });
			return
		}
		c.query("DELETE FROM `data_quiz` WHERE id=?", [req.id], { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "Quiz has deleted successfully",
				success: true
			});
		});
		c.end();
	},
	deleteQuizAll: function (req, res) {
		c.query("DELETE FROM `data_quiz`", null, { metadata: true, useArray: true }, function (err, rows) {
			if (err) {
				res.status(500).send({ message: "Error 500: Internal Server Error" });
				console.log(err);
				return
			}

			res.json({
				affectedRows: rows.info.affectedRows,
				err: null,
				message: "All Quiz has deleted successfully :[",
				success: true
			});
		});
		c.end();
	}
}