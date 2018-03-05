const questions = require(__dirname + "/../data/questions")

module.exports = function(app) {
	app.get("/home?", function(req, res) {
		res.render("home")
	});

	app.get("/survey", function(res, res) {
		res.render("survey", {
			questions: questions.questions,
			scores: questions.scores
		});
	})
}