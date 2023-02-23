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
  if(!existingUser){
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    console.log("user not found")
    res.status(404).send("User not found")
    return
  }


  if(req.params.pid){
    const existingProduct = await usersDb.Product.findOne({where:{id:req.params.pid}})
    if(!existingProduct){
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      console.log("product not found")
      // res.sendStatus(400);
      res.status(404).send("Product not found")
      // res.message = "Product not found";
      return
    }
    if (req.params.pid && existingUser.id !=existingProduct.owner_user_id ) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(403);
      return
    }
  }

  if (req.params.id && existingUser.id !=req.params.id ) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(403);
    return
  }

  
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
  req.ctx.user.id = existingUser.id;
  next()
}