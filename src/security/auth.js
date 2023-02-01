// const userService = require('../service/service');
const usersDb = require('../model/db');
const basic_Auth = require('basic-auth');
const bcrypt = require('bcryptjs');
module.exports = auth;
console.log("inside auth");
async function auth (req,res,next){
  const dataFromAuth = basic_Auth(req);
  if (!dataFromAuth || !dataFromAuth.name || !dataFromAuth.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  console.log(dataFromAuth)
  const existingUser = await usersDb.User.findOne({where:{username:dataFromAuth.name}})
  console.log(existingUser)
  console.log(existingUser.password)
  console.log(dataFromAuth.pass)
  if (!(await bcrypt.compare(dataFromAuth.pass, existingUser.password)))
  {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return
  }
  console.log("authentication user details")
  console.log(existingUser) 
  req.ctx={};
  req.ctx.user = dataFromAuth;
  next()
}