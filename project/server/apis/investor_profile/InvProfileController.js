const userModel = require("../users/UserModel");
const InvProfileModel = require("./InvProfileModel");

const bcrypt = require("bcrypt");

const InvesterRegister = (req, res) => {
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
      .then((invExists) => {
        if (invExists == null) {
          let invobj = new userModel();
          invobj.name = req.body.name;
          invobj.email = req.body.email;
          ((invobj.password = bcrypt.hashSync(req.body.password, 10)),
            (invobj.userType = "2"));

          invobj
            .save()
            .then((data) => {
              console.log(data._id);

              let invProfileobj = new InvProfileModel();
              ((invProfileobj.country = req.body.country),
                (invProfileobj.kycStatus = req.body.kycStatus),
                (invProfileobj.userId = data._id),
                (invProfileobj.riskPreference = req.body.Contact));

              invProfileobj.save().then((invProfile) => {
                res.send({
                  message: "Invester added successfully",
                  status: 201,
                  success: true,
                  data: invProfile,
                });
              });
            })
            .catch((err) => {
              res.send({
                massage: err,
                success: false,
                status: 403,
              });
            });
        } else {
          res.send({
            massage: "Invester already exist",
            success: false,
            status: 403,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({
          massage: err,
          success: false,
          status: 403,
        });
      });
  }
};

module.exports = {
  InvesterRegister,
};
