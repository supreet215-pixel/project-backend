const commentsModel = require("./CommentsModel");

const add = (req, res) => {
  // console.log("HLo");

  let commentsObj = new commentsModel();
  commentsObj.commentText = req.body.commentText;

  commentsObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Comment Added!🥳",
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
    commentsModel
      .findOne({ _id: req.body._id })
      .then((ExistComment) => {
        if (ExistComment == null) {
          console.log("No Comments Added!😕");
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: ExistComment,
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
    commentsModel
      .findOne({ _id: req.body._id })
      .then((ExistComment) => {
        if (ExistComment == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          commentsModel
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.send({
                status: 200,
                message: "Comment Deleted!🫡",
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

module.exports = {
  add,
  single,
  DeleteOne,
};
