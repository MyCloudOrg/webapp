
const bcrypt = require('bcryptjs');
const usersDb = require('../model/db'); 

async function  create_NewUser(user) {
  await usersDb.initialize();
  const userDataFound = await usersDb.User.findOne({ where: { username: user.username } })
  if (userDataFound) {
    throw user.username + " already exists";
    return;
  }
  if (user.password) {
    user.hash = await bcrypt.hash(user.password, 10);
  }
  let dateFormat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  user.account_created = dateFormat;
  user.account_updated = dateFormat;
  user.password = user.hash;
  await usersDb.User.create(user);
  const dt = await usersDb.User.findOne({ where: { username: user.username } })
 let {id,username,first_name,last_name,account_created,account_updated}=dt;
  return {id,username,first_name,last_name,account_created,account_updated};
}

async function updateUser(data,user){
  console.log('inside update user')
  let userDataFound = await usersDb.User.findOne({ where: { username: user.name } })
  if (!userDataFound) {
    throw user.username + " doesn't exists";
    return;
  }
  userDataFound = userDataFound.dataValues
  if (data.password) {
    userDataFound.password = await bcrypt.hash(data.password, 10);
  }
  if(data.account_created){
    delete user.account_created;
  }

  if(data.account_updated){
    delete user.account_updated;
  }
  if(data.first_name){
    userDataFound.first_name = data.first_name
  }
  if(data.last_name){
    userDataFound.last_name = data.last_name
  }
  let dateFormat = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  userDataFound.account_updated = dateFormat
  usersDb.User.update({password:userDataFound.password,
                  first_name:userDataFound.first_name,
                  last_name:userDataFound.last_name,
                  account_updated:userDataFound.account_updated
                  },{where:{username:user.name}})
return {id:userDataFound.id,username:userDataFound.username,first_name:userDataFound.first_name,last_name:userDataFound.last_name,account_created:userDataFound.account_created,account_updated:userDataFound.account_updated}
}

async function findUserDetails({username}){
  const data = await usersDb.User.findOne({ where: { username: username } });
  const {id,first_name,last_name,account_created,account_updated} = data.dataValues;
  console.log({id,username,first_name,last_name,account_created,account_updated});
  return {id,username,first_name,last_name,account_created,account_updated}

}

async function getUserWithHash({username}){
  return await usersDb.User.findOne({ where: { username: username } });
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}
module.exports = {
  // authenticate,
  findUserDetails,
  getUserWithHash,
  updateUser,
  create_NewUser
}