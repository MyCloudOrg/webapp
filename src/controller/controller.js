const express = require('express');
const router = express.Router();

const auth = require('../security/auth.js')
const user_Service = require('../service/service');
const {validate_Create_User,validate_Update_User} = require('../security/validation');
console.log("Please here me controller")
router.get('/self',auth,findUserDetails)
router.put('/self',auth,validate_Update_User,update_UserDetails);
router.post('/',validate_Create_User,create_NewUser);
module.exports = router;

function findUserDetails(req,res,next){
    user_Service.findUserDetails({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function update_UserDetails(req,res,next){
    user_Service.updateUser(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data)})
  .catch(next)
}

function create_NewUser(req,res,next){
    user_Service.create_NewUser(req.body)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data);res.sendStatus(400);next()});
}