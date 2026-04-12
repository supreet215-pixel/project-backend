const userModel = require("../apis/users/UserModel");
const bcrypt = require("bcrypt");


module.exports = () => {
  userModel
    .findOne({ email: "admin@gmail.com" })
    .then((data) => {
      if (data == null) {
        let userobj = new userModel();

        ((userobj.name = "admin"),
          (userobj.email = "admin@gmail.com"),
          (userobj.password = bcrypt.hash("1234",10)),
          (userobj.userType = "1"),
          userobj
            .save()
            .then(() => {
                console.log("Admin Created Successfully!")
            })
            .catch(() => {}));
      } else {
        console.log("admin already exist");
      }
    })
    .catch((err) => {});
};
