const userModel = require("../users/UserModel");
const userProfileModel = require("./UserProfileModel");
const bcrypt = require("bcrypt");

const UserRegister = (req, res) => {
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
  if (!req.body.occupation) {
    errMsg.push("🚫 Occupation is required!");
  }
  if (!req.body.country) {
    errMsg.push("🚫 Country is required!");
  }
  if (!req.body.address) {
    errMsg.push("🚫 Address is required!");
  }
  if (!req.body.contact) {
    errMsg.push("🚫 Contact is required!");
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
          ((userobj.password = bcrypt.hashSync(req.body.password, 10)),
            (userobj.userType = "3"));

          userobj
            .save()
            .then((data) => {
              console.log(data._id);

              let userProfileobj = new userProfileModel();
              ((userProfileobj.country = req.body.country),
                (userProfileobj.occupation = req.body.occupation),
                (userProfileobj.userId = data._id),
                (userProfileobj.address = req.body.address),
                (userProfileobj.contact = req.body.contact));

              userProfileobj.save().then((userProfile) => {
                res.send({
                  message: "User added Successfully",
                  status: 201,
                  success: true,
                  data: userProfile,
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
            massage: "User already exist",
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
  UserRegister,
};
