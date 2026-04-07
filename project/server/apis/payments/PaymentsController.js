const paymentModel = require("./PaymentsModel");

const add = (req, res) => {
  // console.log("HLo");

  let paymentObj = new paymentModel();
  paymentObj.amount = req.body.amount;
  paymentObj.paymentMethod = req.body.paymentMethod;

  paymentObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Payment Done!🥳",
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
   paymentModel
      .findOne({ _id: req.body._id })
      .then((ExistPayment) => {
        if (ExistPayment == null) {
          console.log("No Payment Added!😕");
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: ExistPayment,
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
    paymentModel
      .findOne({ _id: req.body._id })
      .then((ExistPayment) => {
        if (ExistPayment == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          paymentModel
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.send({
                status: 200,
                message: "Payment Deleted!🫡",
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

const UpdatePayment = (req, res) => {
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
    paymentModel
      .findOne({ _id: req.body._id })
      .then((ExistPayment) => {
        if (ExistPayment == null) {
          res.send({
            status: 404,
            message: "No Payment exists!",
            success: false,
          });
        } else {
          if (req.body.amount) {
            ExistComment.amount = req.body.amount;
          }
          if (req.body.paymentMethod) {
            ExistComment.paymentMethod = req.body.paymentMethod;
          }

          ExistPayment.save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Payment Updated!🥳",
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
  paymentModel
    .find(req.body)
    .then((ExistPayment) => {
      if (ExistPayment == null) {
        res.send({
          status: 404,
          message: "Payment Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Payment",
          success: true,
          totalPayment: ExistPayment.length,
          data: ExistPayment,
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
  UpdatePayment,
  all,
};