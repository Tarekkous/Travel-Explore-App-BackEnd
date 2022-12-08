const express = require("express");
const routerUser = express.Router();
const {getUser,postRegister,putUser,deleteUser,getOneUser,authFct, postLogin} = require('./user.controlleur')

//!CRUD USER
routerUser
  .route("/user")
  .get(authFct,getUser)
    .post(postRegister);
routerUser
  .route("/login")
  .post(postLogin)

routerUser
.route("/user/:id")
    .put(authFct,putUser)

    .delete(authFct,deleteUser)

    .get (getOneUser);




















module.exports = routerUser;
