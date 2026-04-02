const userModel = require("../users/UserModel");
const invProfileModel = require("./InvProfileModel");

const register = (req, res) => {
  let errMsg = [];

  if (!req.body.name) {
    errMsg.push("🚫 Name is required!");
  }
  if (!req.body.email) {
    errMsg.push("🚫 Email is required!");
  }
  if (!req.body.password) {
    errMsg.push("🚫 Password is required!");
  }
  if (!req.body.country) {
    errMsg.push("🚫 Country is required!");
  }
  if (!req.body.kycStatus) {
    errMsg.push("🚫 KycStatus is required!");
  }
  if (!req.body.riskPreference) {
    errMsg.push("🚫 RiskPreference is required!");
  }

  if (errMsg.length > 0) {
    res.send({
      massage: errMsg,
      success: false,
      status: 404,
    });
  } else {
    userModel
      .findOne({ email: req.body.email })
      .then((userExists) => {
        if (userExists == null) {
          let userobj = new userModel();
          userobj.name = req.body.name;
          userobj.email = req.body.email;
          userobj.password = req.body.password;
          userobj.userType = "2"

          userobj.save().then((data) => {
            console.log(data._id);

            let invProfileobj = new invProfileModel();
            ((invProfileobj.country = req.body.country),
              (invProfileobj.kycStatus = req.body.kycStatus),
              (invProfileobj.userId = data._id),
              (invProfileobj.riskPreference = req.body.Contact));

            invProfileobj.save().then((invProfile) => {
              res.send({
                message: "Investers added successfully",
                status: 201,
                success: true,
                data: invProfile,
              });
            });
          }).catch(()=>{});
        } else {
          res.send({
            massage: "User already exist",
            success: false,
            status: 403,
          });
        }
      })
      .catch(()=>{});
  }
};



module.exports={
    register
}
