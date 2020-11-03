const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

//write this in individual folders for routes (hotrestaurant)
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})