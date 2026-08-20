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
          userobj.password = bcrypt.hashSync(req.body.password, 10);
          userobj.userType = "3";
          userobj.status = true;
          userobj.created_at = Date.now();

          userobj
            .save()
            .then((data) => {
              let userProfileobj = new userProfileModel();
              userProfileobj.country = req.body.country;
              userProfileobj.occupation = req.body.occupation;
              userProfileobj.userId = data._id;
              userProfileobj.address = req.body.address;
              userProfileobj.contact = req.body.contact;
              userProfileobj.created_at = Date.now();

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

const all = (req, res) => {
  userProfileModel
    .find(req.body)
    .populate("userId")
    .sort({ created_at: -1 })
    .then((data) => {
      res.send({
        status: 200,
        message: "All Users fetched successfully",
        success: true,
        total: data.length,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
        status: 500,
        message: "Internal Server Error",
        success: false,
        error: err,
      });
    });
};

const single = (req, res) => {
  if (!req.body._id) {
    return res.send({
      status: 400,
      message: "_id is required",
      success: false,
    });
  }

  userProfileModel
    .findOne({ _id: req.body._id })
    .populate("userId")
    .then((data) => {
      if (!data) {
        return res.send({
          status: 404,
          message: "User not found",
          success: false,
        });
      }
      res.send({
        status: 200,
        message: "User fetched successfully",
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.send({
        status: 500,
        message: "Internal Server Error",
        success: false,
        error: err,
      });
    });
};

const softDelete = async (req, res) => {
  if (!req.body._id) {
    return res.send({
      status: 400,
      message: "_id is required",
      success: false,
    });
  }

  try {
    const profile = await userProfileModel.findById(req.body._id);
    if (!profile) {
      return res.send({
        status: 404,
        message: "User profile not found",
        success: false,
      });
    }

    const user = await userModel.findById(profile.userId);
    if (!user) {
      return res.send({
        status: 404,
        message: "User account not found",
        success: false,
      });
    }

    user.status = !user.status;
    await user.save();

    res.send({
      status: 200,
      message: `User status changed to ${user.status ? "Active" : "Inactive"}`,
      success: true,
      data: user,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

const DeleteOne = async (req, res) => {
  if (!req.body._id) {
    return res.send({
      status: 400,
      message: "_id is required",
      success: false,
    });
  }

  try {
    const profile = await userProfileModel.findById(req.body._id);
    if (!profile) {
      return res.send({
        status: 404,
        message: "User profile not found",
        success: false,
      });
    }

    if (profile.userId) {
      await userModel.findByIdAndDelete(profile.userId);
    }
    await userProfileModel.findByIdAndDelete(req.body._id);

    res.send({
      status: 200,
      message: "User deleted successfully!",
      success: true,
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

module.exports = {
  UserRegister,
  all,
  single,
  softDelete,
  DeleteOne,
};
