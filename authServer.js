const express = require("express");
const app = express();
const cors = require("cors");
const { json, Router } = require("express");

// Routes déclarations
const routerUser = require('./routes/user');
const routerList = require('./routes/todolist/todolist.route')
const routerDescription = require('./routes/description/description.route')

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
  res.send(" auth 2 Works");
});






const PORT = process.env.PORT || 3000
// écouter le serveur
app.listen(PORT, () => {
  console.log("server is running!");
});
