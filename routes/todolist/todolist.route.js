const express = require("express");
const routerList = express.Router();
const {
  getLists,
  postList,
  updateList,
  deleteList,
  getOneList,
  deleteOneList
} = require("./todolist.controlleur");

//!CRUD TODOLIST (See todolist.controlleur.js)
routerList
.route("/list")
.get(getLists);

routerList
.route("/list/:id")
.post(postList)
.put(updateList)
.delete(deleteList);

routerList
.route("/allLists/:id").get(getOneList);
routerList
.route("/list/:id1/:id2")
.delete(deleteOneList);

module.exports = routerList;
