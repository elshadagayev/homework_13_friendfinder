const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("port", (process.env.PORT || 5000));
app.use(express.static(__dirname + "/app/public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./app/routing/apiRouting")(app);
require("./app/routing/htmlRouting")(app);

app.listen(app.get("port"), function() {
  console.log("Listening on PORT " + app.get("port"));
});