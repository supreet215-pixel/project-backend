const pitchModel = require("./PitchModel");

const add = (req, res) => {
  // console.log("HLo");

  let pitchObj = new pitchModel();
  pitchObj.title = req.body.title;
  pitchObj.description = req.body.description;
  pitchObj.category = req.body.category;
  pitchObj.pitchVideoUrl = req.body.pitchVideoUrl;
  pitchObj.targetAmount = req.body.targetAmount;
  pitchObj.currentAmount = req.body.currentAmount;
  pitchObj.aiScore = req.body.aiScore;

  pitchObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Pitch Added!🥳",
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
    pitchModel
      .findOne({ _id: req.body._id })
      .then((ExistPitch) => {
        if (ExistPitch == null) {
          console.log("No Pitch Added!😕");
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: ExistPitch,
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
    pitchModel
      .findOne({ _id: req.body._id })
      .then((ExistPitch) => {
        if (ExistPitch == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          pitchModel
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.send({
                status: 200,
                message: "Pitch Deleted!🫡",
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

const UpdatePitch = (req, res) => {
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
    pitchModel
      .findOne({ _id: req.body._id })
      .then((ExistPitch) => {
        if (ExistPitch == null) {
          res.send({
            status: 404,
            message: "No Pitch exists!",
            success: false,
          });
        } else {
          if (req.body.title) {
            ExistComment.title = req.body.title;
          }
          if (req.body.description) {
            ExistComment.description = req.body.description;
          }
          if (req.body.category) {
            ExistComment.category = req.body.category;
          }
          if (req.body.pitchVideoUrl) {
            ExistComment.pitchVideoUrl = req.body.pitchVideoUrl;
          }
          if (req.body.targetAmount) {
            ExistComment.targetAmount = req.body.targetAmount;
          }
          if (req.body.currentAmount) {
            ExistComment.currentAmount = req.body.currentAmount;
          }
          if (req.body.aiScore) {
            ExistComment.aiScore = req.body.aiScore;
          }

          ExistPitch.save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Pitch Updated!🥳",
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
  pitchModel
    .find(req.body)
    .then((ExistPitch) => {
      if (ExistPitch == null) {
        res.send({
          status: 404,
          message: "Pitch Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Pitch",
          success: true,
          totalPitch: ExistPitch.length,
          data: ExistPitch,
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
  UpdatePitch,
  all,
};
