// const userService = require('../service/service');
const usersDb = require('../model/db');
const basic_Auth = require('basic-auth');
const logger = require('../Logger/logger');
const bcrypt = require('bcryptjs');
module.exports = auth;
logger.info("inside auth");
async function auth (req,res,next){
  const dataFromAuth = basic_Auth(req);
  if (!dataFromAuth || !dataFromAuth.name || !dataFromAuth.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  logger.info(dataFromAuth.name)
  const existingUser = await usersDb.User.findOne({where:{username:dataFromAuth.name}})


  if(!existingUser){
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    logger.info("user not found :",dataFromAuth.name)
    res.status(401).send("Invalid user or Password")
    return
  }

  if(req.params.pid && req.params.image_id){
    const onlyImage = await usersDb.Image.findOne({where:{image_id:req.params.image_id}})

    const ProductImage = await usersDb.Image.findOne({
      where: {
          image_id: req.params.image_id,
          product_id: req.params.pid
      }
  });

  if(onlyImage){
    if (!ProductImage) {
        return res.status(403).send("Forbidden");
    }
}else{
    return res.status(404).send("Image not Found");
}
  }

  if(req.params.pid){
    const existingProduct = await usersDb.Product.findOne({where:{id:req.params.pid}})
    if(!existingProduct){
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      logger.info("product not found")
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

  
  logger.info(existingUser)
  logger.info(existingUser.password)
  logger.info(dataFromAuth.pass)
  if (!(await bcrypt.compare(dataFromAuth.pass, existingUser.password)))
  {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return
  }
  logger.info("authentication user details")
  logger.info(existingUser) 
  req.ctx={};
  req.ctx.user = dataFromAuth;
  req.ctx.user.id = existingUser.id;
  next()
}