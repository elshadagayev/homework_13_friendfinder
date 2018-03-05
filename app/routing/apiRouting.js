const fs = require("fs");
const friendsJS = __dirname + "/../data/friends.js"

module.exports = function(app) {

	app.post("/api/friends", function(req, res) {
		const { name, photo } = req.body
		const scores = req.body['scores[]']
		
		fs.readFile(friendsJS, "utf8", function(err, data) {
			if (err)
				throw err;

			data = JSON.parse(data);
			if (!data)
				throw "JSON format is wrong";

			getClosestMatch(scores, (closestMatch) => {
				data.push({name, photo, scores})

				fs.writeFile(friendsJS,  JSON.stringify(data), function(err) {
					if(err)
						throw err;

					res.json(closestMatch);
				});
			});
		});
	});

	app.get("/api/friends", function(req, res) {
		fs.readFile(friendsJS, "utf8", function(err, data) {
			if(err)
				throw err;

			res.json(JSON.parse(data));
		});
	});

}

function getClosestMatch (scores1, callback) {
	let bestMatch = {}, 
		score1Sum = 0, 
		score2Sum = 0, 
		difference = 40;

	for(let i in scores1)
		score1Sum += parseInt(scores1[i]);

	fs.readFile(friendsJS, "utf8", function(err, data) {
		if(err)
			throw err;

		data = JSON.parse(data);

		for(let i in data) {
			let scores2 = data[i].scores;
			score2Sum = 0;
			for(let i in scores2)
				score2Sum += parseInt(scores2[i])

			let abs = Math.abs(score2Sum - score1Sum);

			console.log({
				scores1,
				scores2,
				score1Sum,
				score2Sum,
				abs,
				difference
			});

			if(abs < difference) {
				bestMatch = data[i];
				difference = abs;
			}
		}

		callback(bestMatch);
	});
}