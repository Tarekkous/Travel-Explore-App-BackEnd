const express = require("express");
const routerContact = express.Router();
const {postContact} = require('./contact.controlleur');


routerContact 
    .route("/contact")
    .post(postContact)






 module.exports = routerContact;
