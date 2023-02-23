const emailVerifier = require('email-validator');

 function validate_Create_User(req, res, next) {
  if(!emailVerifier.validate(req.body['username']) ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid email provided'});
    return;
  }
  if(!req.body['password'] || req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid password provided'});
    return;
  }
  if(!req.body['last_name'] || req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid last_name provided'});
    return;
  }
  if(!req.body['first_name'] || req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid first_name provided'});
    return;
  }
  return next();
}


 function validate_Update_User(req, res, next) {

  console.log('inside validate')
  if(req.body['username'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'username can\'t be updated'});
    return;
  }
  if(req.body['account_updated'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'updated time  can\'t be updated'});
    return;
  }
  if(req.body['account_created'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'created time can\'t be updated'});
    return;
  }
  if(req.body['password'] && req.body['password'].trim().length <= 5){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid password provided'});
    return;
  }
  if(req.body['last_name'] && req.body['last_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid last_name provided'});
    return;
  }
  if(req.body['first_name'] && req.body['first_name'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'invalid first_name provided'});
    return;
  }
  return next();
}

function validate_Update_Product(req, res, next) {

  console.log('inside product validate')
  if(!req.body['name']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'name can\'t be empty'});
    return;
  }
  if(!req.body['description']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'description can\'t be empty'});
    return;
  }
  if(!req.body['sku']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'sku can\'t be empty'});
    return;
  }
  if(!req.body['manufacturer']){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'manufacturer can\'t be empty'});
    return;
  }
  if(!req.body['quantity']|| !(Number.isInteger(req.body['quantity']) && req.body['quantity'] >= 0 && req.body['quantity'] <= 100)){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'Enter valid quantity'});
    return;
  }
  if(req.body['date_added'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'created time  can\'t be updated'});
    return;
  }
  if(req.body['date_last_updated'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'updated time can\'t be updated'});
    return;
  }
  return next();
}


function validate_patch_Product(req, res, next) {

  console.log('inside product validate')
  // console.log('jahsbdkasjdbkasjdb name'+req.body['name'].length <=0)
  if(req.body.hasOwnProperty('name') && req.body['name'].trim().length<=0){
    console.log('inside name'+req.body['name'].trim().length==0)
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'name can\'t be empty'});
    return;
  }
  if(req.body.hasOwnProperty('description') && req.body['description'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'description can\'t be empty'});
    return;
  }
  
  if(req.body.hasOwnProperty('sku') && req.body['sku'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'sku can\'t be empty'});
    return;
  }
  if(req.body.hasOwnProperty('manufacturer') && req.body['manufacturer'].trim().length <= 0){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'manufacturer can\'t be empty'});
    return;
  }
  if(req.body['quantity'] && !(Number.isInteger(req.body['quantity']) && req.body['quantity'] >= 0 && req.body['quantity'] <= 100)){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'Enter valid Quantity'});
    return;
  }
  if(req.body['date_added'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'created time  can\'t be updated'});
    return;
  }
  if(req.body['date_last_updated'] ){
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send({"error":'updated time can\'t be updated'});
    return;
  }
  return next();
}


module.exports={
  validate_Create_User,
  validate_Update_User,
  validate_Update_Product,
  validate_patch_Product
}