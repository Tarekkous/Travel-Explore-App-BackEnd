const express = require("express");
const app = express();
const cors = require("cors");
const { json, Router } = require("express");

// Routes déclarations
const routerUser = require('./routes/user/user.route');
const routerList = require('./routes/todolist/todolist.route');
const routerDescription = require('./routes/description/description.route');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(routerUser)
app.use(routerList)
app.use(routerDescription)
app.use(cors());

app.get("/", (req, res) => {
  res.send("Works");
});






const PORT = process.env.PORT || 7000
// écouter le serveur
app.listen(PORT, () => {
  console.log("server is running!");
});
