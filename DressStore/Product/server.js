const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Redoyue application." });
});

var corsOptions = {

  origin: "http://localhost:5000"

};

require("./app/routes/category.routes")(app);
require("./app/routes/product.routes")(app);


app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
app.use(cors(corsOptions));