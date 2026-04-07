const investmentsModel = require("./InvestmentsModel");

const add = (req, res) => {
  // console.log("HLo");

  let investmentsObj = new investmentsModel();
  investmentsObj.amount = req.body.amount;
  investmentsObj.equityPercent = req.body.equityPercent;

  investmentsObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Investment Done!🥳",
        data: data,
      });
    })
    .catch(() => {});
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
    investmentsModel
      .findOne({ _id: req.body._id })
      .then((ExistInvestment) => {
        if (ExistInvestment == null) {
          console.log("No Investments Done!😕");
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: ExistInvestment,
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
    investmentsModel
      .findOne({ _id: req.body._id })
      .then((ExistInvestment) => {
        if (ExistInvestment == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          investmentsModel
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.send({
                status: 200,
                message: "Investment Deleted!🫡",
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

const UpdateInvestment = (req, res) => {
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
    investmentsModel
      .findOne({ _id: req.body._id })
      .then((ExistInvestment) => {
        if (ExistInvestment == null) {
          res.send({
            status: 404,
            message: "No such Investment found!!",
            success: false,
          });
        } else {
          if (req.body.amount) {
            ExistInvestment.amount = req.body.amount;
          }
          if (req.body.equityPercent) {
            ExistInvestment.equityPercent = req.body.equityPercent;
          }

          ExistInvestment.save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Investment Updated!🥳",
                data: data,
              });
            })
            .catch(() => {});
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

const all = (req, res) => {
  investmentsModel
    .find(req.body)
    .then((ExistInvestment) => {
      if (ExistInvestment == null) {
        res.send({
          status: 404,
          message: "Investment Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All investments",
          success: true,
          totalInvestment: ExistInvestment.length,
          data: ExistInvestment,
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
};

module.exports = {
  add,
  single,
  DeleteOne,
  UpdateInvestment,
  all
};
