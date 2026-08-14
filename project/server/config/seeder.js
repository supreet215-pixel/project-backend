const userModel = require("../apis/users/UserModel");
const bcrypt = require("bcrypt");

module.exports = () => {
  userModel
    .findOne({ email: "admin@gmail.com" })
    .then((data) => {
      
      if (data == null) {
        // console.log("hello")
        let userobj = new userModel();

        ((userobj.name = "admin"),
          (userobj.email = "admin@gmail.com"),
          (userobj.password = bcrypt.hashSync("1234", 10)),
          (userobj.userType = "1"),
          userobj
            .save()
            .then(() => {
              console.log("Admin Created Successfully!");
            })
            .catch((err) => {
              console.log(err)
            }));
      } else {
        console.log("admin already exist");
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
};