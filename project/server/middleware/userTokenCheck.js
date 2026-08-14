const jwt = require("jsonwebtoken");
const skey = "payuu123";

module.exports = (req, res, next) => {
  // console.log(req.headers["authorization"]);

  let token = req.headers["authorization"];

  jwt.verify(token, skey, function (err, decoded) {
    if (err) {
      res.send({
        message: "Token NOt Found",
        status: 404,
        success: false,
        err: err,
      });
    } else {
      console.log("decoded", decoded.userType);
      if (decoded.userType == "3") {
        req.decoded=decoded

        next();
      } else {
        res.send({
          message: "Invaild Token",
          status: 404,
          success: false,
        });
      }
    }
  });
};
