const userModel = require("./UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const skey = "payuu123";

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send({
      massage: "Email and password is required",
      success: false,
      status: 403,
    });
  } else {
    userModel
      .findOne({ email: req.body.email })
      .then((userData) => {
        if (userData == null) {
          res.send({
            massage: "user Not found",
            success: false,
            status: 404,
          });
        } else {
          let confirm = bcrypt.compareSync(
            req.body.password,
            userData.password,
          );

          // console.log(confirm);
          // res.send(confirm)

          let payload = {
            userId: userData._id,
            email: userData.email,
            userType: userData.userType,
            name: userData.name,
          };

          console.log({ userData });
          console.log({ payload });

          let token = jwt.sign(payload, skey);

          if (confirm) {
            res.send({
              massage: "Login Successfully",
              success: true,
              status: 200,
              data:payload,
              token:token,
            });
          } else {
            res.send({
              massage: "Invaild password",
              success: false,
              status: 404,
            });
          }
        }
      })
      .catch((err) => {
        res.send({
          massage: "Internal Server Error",
          success: false,
          status: 404,
          error: err,
        });
      });
  }
};

module.exports = { login };
