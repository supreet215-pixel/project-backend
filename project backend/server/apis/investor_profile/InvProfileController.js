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
          invobj.password = bcrypt.hashSync(req.body.password, 10);
          invobj.userType = "2";
          invobj.status = true;
          invobj.created_at = Date.now();

          invobj
            .save()
            .then((data) => {
              let invProfileobj = new InvProfileModel();
              invProfileobj.country = req.body.country;
              invProfileobj.kycStatus = req.body.kycStatus || "Pending";
              invProfileobj.userId = data._id;
              invProfileobj.riskPreference = req.body.riskPreference || req.body.Contact;
              invProfileobj.created_at = Date.now();

              invProfileobj.save().then((invProfile) => {
                res.send({
                  message: "Investor added successfully",
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
            massage: "Investor already exists",
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
  InvProfileModel
    .find(req.body)
    .populate("userId")
    .sort({ created_at: -1 })
    .then((data) => {
      res.send({
        status: 200,
        message: "All Investors fetched successfully",
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

  InvProfileModel
    .findOne({ _id: req.body._id })
    .populate("userId")
    .then((data) => {
      if (!data) {
        return res.send({
          status: 404,
          message: "Investor not found",
          success: false,
        });
      }
      res.send({
        status: 200,
        message: "Investor fetched successfully",
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
    const profile = await InvProfileModel.findById(req.body._id);
    if (!profile) {
      return res.send({
        status: 404,
        message: "Investor profile not found",
        success: false,
      });
    }

    const user = await userModel.findById(profile.userId);
    if (!user) {
      return res.send({
        status: 404,
        message: "Investor account not found",
        success: false,
      });
    }

    user.status = !user.status;
    await user.save();

    res.send({
      status: 200,
      message: `Investor status changed to ${user.status ? "Active" : "Inactive"}`,
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

const updateKyc = async (req, res) => {
  if (!req.body._id || !req.body.kycStatus) {
    return res.send({
      status: 400,
      message: "_id and kycStatus are required",
      success: false,
    });
  }

  try {
    const profile = await InvProfileModel.findById(req.body._id);
    if (!profile) {
      return res.send({
        status: 404,
        message: "Investor profile not found",
        success: false,
      });
    }

    profile.kycStatus = req.body.kycStatus;
    const updated = await profile.save();

    res.send({
      status: 200,
      message: `KYC status updated to ${req.body.kycStatus}`,
      success: true,
      data: updated,
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
    const profile = await InvProfileModel.findById(req.body._id);
    if (!profile) {
      return res.send({
        status: 404,
        message: "Investor profile not found",
        success: false,
      });
    }

    if (profile.userId) {
      await userModel.findByIdAndDelete(profile.userId);
    }
    await InvProfileModel.findByIdAndDelete(req.body._id);

    res.send({
      status: 200,
      message: "Investor deleted successfully!",
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
  InvesterRegister,
  all,
  single,
  softDelete,
  updateKyc,
  DeleteOne,
};
