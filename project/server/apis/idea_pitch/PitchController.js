const { uploadImg } = require("../../utilities/Helper");
const pitchModel = require("./PitchModel");

const add = (req, res) => {
  // console.log("HLo");

  let errmsg = [];

  if (!req.body.title) {
    errmsg.push("Title is required");
  }
  if (!req.body.description) {
    errmsg.push("Description is required");
  }
  if (!req.body.category) {
    errmsg.push("Category is required");
  }
  if (!req.body.targetAmount) {
    errmsg.push("TargetAmount is required");
  }
  if (!req.body.currentAmount) {
    errmsg.push("CurrentAmount is required");
  }
  if (!req.body.aiScore) {
    errmsg.push("AiScore is required");
  }

  if (!req.file) {
    return res.send({
      status: 201,
      message: "Pitch video url is required",
      success: false,
    });
  }
  if (errmsg.length > 0) {
    res.send({
      success: false,
      status: 400,
      message: errmsg,
    });
  } else {
    pitchModel
      .findOne({ title: req.body.title })
      .then(async (Data) => {
        if (Data == null) {
          let pitchObj = new pitchModel();

          pitchObj.title = req.body.title;
          pitchObj.description = req.body.description;
          pitchObj.category = req.body.category;
          pitchObj.targetAmount = req.body.targetAmount;
          pitchObj.currentAmount = req.body.currentAmount;
          pitchObj.aiScore = req.body.aiScore;
          // pitchObj.image = req.body.image;

          try {
            let url = await uploadImg(req.file.buffer);
            pitchObj.pitchVideoUrl = url;
          } catch (err) {
            console.log(err);

            return res.send({
              success: false,
              status: 403,
              message: "Cloudinary error😕",
              err: err,
            });
          }

          // console.log(pitchObj);

          pitchObj.save().then((data) => {
            res.send({
              status: 201,
              success:true,
              message: "Pitch Added!🥳",
              data: data,
            });
          });
        }
      })
      .catch(() => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
        });
      });
  }

  // let pitchObj = new pitchModel();
  // pitchObj.title = req.body.title;
  // pitchObj.description = req.body.description;
  // pitchObj.category = req.body.category;
  // pitchObj.pitchVideoUrl = req.body.pitchVideoUrl;
  // pitchObj.targetAmount = req.body.targetAmount;
  // pitchObj.currentAmount = req.body.currentAmount;
  // pitchObj.aiScore = req.body.aiScore;

  // pitchObj
  //   .save()
  //   .then((data) => {
  //     console.log(data);

  //     res.send({
  //       status: 201,
  //       message: "Pitch Added!🥳",
  //       data: data,
  //     });
  //   })
  //   .catch(() => {
  //     res.send({
  //         status: 500,
  //         message: "Internal Server Error",
  //         success: false,
  //       });
  //   });
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
            ExistPitch.title = req.body.title;
          }
          if (req.body.description) {
            ExistPitch.description = req.body.description;
          }
          if (req.body.category) {
            ExistPitch.category = req.body.category;
          }
          if (req.body.pitchVideoUrl) {
            ExistPitch.pitchVideoUrl = req.body.pitchVideoUrl;
          }
          if (req.body.targetAmount) {
            ExistPitch.targetAmount = req.body.targetAmount;
          }
          if (req.body.currentAmount) {
            ExistPitch.currentAmount = req.body.currentAmount;
          }
          if (req.body.aiScore) {
            ExistPitch.aiScore = req.body.aiScore;
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
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
          error: err,
        });
      });
  }
};

const all = (req, res) => {
  pitchModel
    .find(req.body)
    .populate("category")
    .populate("ownerId")
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
        error: err,
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
