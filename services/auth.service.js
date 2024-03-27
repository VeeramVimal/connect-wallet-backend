const { User } = require("../models");

// const demo_register = () => {
//     async.parallel({
//         logindata: function(cb) {
//           login.findOne({useraddress:pdata.useraddress} , {_id:0 } ).exec(cb)
//       }
//       }, function(err, results) {
//       if (results.logindata) {
//         res.json({'status':"userAddress",message:"Useraddressexists"});
//       }
//       else {
//           var login_new = new login({
//             useraddress:pdata.useraddress,
//             percentage:pdata.percentage,
//             status:"true"
//           });
//         login_new.save({},function(conerr ,conupdate) {
//           if (!conerr) {
//             res.json({'status':true,message:"useraddress added"});
//           }
//           else {
//             res.json({'status':false,message:"Some Error Was Occurred"});
//           }
//         })
//       }
//       });
// }
/**
 * @description single data fetch by userAddress
 * @param {}
 * @returns {Promise<User>}
 */
const singleUser = async (useraddress) => {
  const user = await User.findOne({ useraddress });
  return user;
};
/**
 * @description register by userAddress
 * @param {}
 * @returns {Promise<User>}
 */
const registerServces = async (userBody) => {
  const { useraddress } = userBody;
  const user = await singleUser(useraddress);
  // if(user) throw new Error('user already exist');
  if (user) return { message: "user already exist" };
  userBody.userStatus = 1;
  return User.create(userBody).then(
    (res) => res && { message: "user register Successfully" }
  );
};
/**
 * @description login service by userAddress
 * @param {}
 * @returns {Promise<User>}
 */
const loginServices = async (userBody) => {
  const { useraddress } = userBody;
  const user = await singleUser(useraddress);
  if(user) return user;
};

module.exports = {
  registerServces,
  singleUser,
  loginServices,
};
