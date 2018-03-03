const express = require("express");
//var bodyParser = require("body-parser");

const app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.get("/", function(req, res) {
	res.render("index");
});

/*var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quotes_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Express and MySQL code should go here.*/

app.listen(app.get("port"), function() {
  console.log("Listening on PORT " + app.get("port"));
});