const adminModel = require("./AdminActionModel");

const add = (req, res) => {
  // console.log("HLo");

  let adminObj = new adminModel();
  adminObj.actionType = req.body.actionType;
  adminObj.reason = req.body.reason;

  adminObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Action Completed!🥳",
        data: data,
      });
    })
    .catch(() => {
        res.send({
      status: 500,
      message: ErrMsg,
      success: false,
    });
    });
};

const single = (req, res) => {
  let ErrMsg = [];

  if (!req.body._id) {
    ErrMsg.push("_id is required");
  }

  if (ErrMsg.length > 0) {
    res.send({
      status: 404,
      message: ErrMsg,
      success: false,
    });
  } else {
   adminModel
      .findOne({ _id: req.body._id })
      .then((ExistAdminAction) => {
        if (ExistAdminAction == null) {
          console.log("No Admin Action Added!😕");
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: ExistAdminAction,
          });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      });
  }
};

const DeleteOne = (req, res) => {
  let ErrMsg = [];

  if (!req.body._id) {
    ErrMsg.push("_id is required");
  }

  if (ErrMsg.length > 0) {
    res.send({
      status: 404,
      message: ErrMsg,
      success: false,
    });
  } else {
    adminModel
      .findOne({ _id: req.body._id })
      .then((ExistAdminAction) => {
        if (ExistAdminAction == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          adminModel
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.send({
                status: 200,
                message: "Admin Action Deleted!🫡",
                success: true,
              });
            })
            .catch((err) => {
              res.send({
                status: 500,
                message: "Internal Server Error",
                success: false,
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      });
  }
};

const UpdateAdminAction = (req, res) => {
  let ErrMsg = [];

  if (!req.body._id) {
    ErrMsg.push("_id is required");
  }

  if (ErrMsg.length > 0) {
    res.send({
      status: 404,
      message: ErrMsg,
      success: false,
    });
  } else {
    adminModel
      .findOne({ _id: req.body._id })
      .then((ExistAdminAction) => {
        if (ExistAdminAction == null) {
          res.send({
            status: 404,
            message: "No Payment exists!",
            success: false,
          });
        } else {
          if (req.body.amount) {
            ExistAdminAction.actionType = req.body.actionType;
          }
          if (req.body.paymentMethod) {
            ExistAdminAction.reason = req.body.reason;
          }

          ExistAdminAction.save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Admin Action Updated!🥳",
                data: data,
              });
            })
            .catch((err) => {
              res.send({
                status: 500,
                message: "Internal Server Error",
                success: false,
                error:err
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
          error:err
        });
      });
  }
};

const all = (req, res) => {
  adminModel
    .find(req.body)
    .then((ExistAdminAction) => {
      if (ExistAdminAction == null) {
        res.send({
          status: 404,
          message: "Admin Action Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Admin Action",
          success: true,
          totalAdminAction: ExistAdminAction.length,
          data: ExistAdminAction,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: 500,
        message: "Internal Server Error",
        success: false,
        error:err
      });
    });
};

module.exports = {
  add,
  single,
  DeleteOne,
  UpdateAdminAction,
  all,
};