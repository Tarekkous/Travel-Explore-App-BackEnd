const express = require('express');
const { get } = require('../user/user.route');
const routerDescription = express.Router()
const {getDescription,postDescription,updateDescription,deleteDescription,getOneDescription, deleteAllDescription} = require ('./description.controlleur')



routerDescription
.route ("/description")
.get(getDescription)
routerDescription
.route("/description/:id")
.post(postDescription)
.put(updateDescription)
.delete(deleteDescription)
.get(getOneDescription)
.delete(deleteAllDescription)

    

module.exports = routerDescription
    
    
  