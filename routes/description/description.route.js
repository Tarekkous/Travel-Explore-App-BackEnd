const express = require('express');
const { get } = require('../user/user.route');
const routerDescription = express.Router()
const {getDescription,postDescription,updateDescription,deleteDescription,getOneDescription} = require ('./description.controlleur')



routerDescription
.route ("/description")
.get(getDescription)
routerDescription
.route("/description/:id")
.post(postDescription)
.put(updateDescription)
.delete(deleteDescription)
.get(getOneDescription)
    

module.exports = routerDescription
    
    
  