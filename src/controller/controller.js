const express = require('express');
const router = express.Router();
const logger = require('../Logger/logger');
const auth = require('../security/auth.js')
const user_Service = require('../service/service');
const {validate_Create_User,validate_Update_User} = require('../security/validation');
const client = require('../Logger/statsd');
console.log("Please here me controller")
router.get('/:id',auth,findUserDetails)
router.put('/:id',auth,validate_Update_User,update_UserDetails);
router.post('/',validate_Create_User,create_NewUser);
module.exports = router;

function findUserDetails(req,res,next){
  logger.info("Getting User Details with req: ",req.body)
  client.increment('GetUser', 1);
    user_Service.findUserDetails({username:req.ctx.user.name})
  .then(data => res.json(data))
  .catch(next)
}

function update_UserDetails(req,res,next){
  logger.info("Updating User Details with req: ",req.body)
  client.increment('PutUser', 1);
    user_Service.updateUser(req.body,req.ctx.user)
  .then(data => {res.status(204);res.json(data)})
  .catch(next)
}

function create_NewUser(req,res,next){
  logger.info("Creating New User Details with req: ",req.body)
  client.increment('PostUser', 1);
    user_Service.create_NewUser(req.body,res)
  .then(data => {res.status(201);res.json(data)})
  .catch(data => {console.log(data); res.status(400).send("User already exists");next()});
}