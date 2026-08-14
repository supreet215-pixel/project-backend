const mediaModel = require("./MediaModel");

const add = (req, res) => {
  // console.log("HLo");

  let mediaObj = new mediaModel();
  mediaObj.mediaUrl = req.body.mediaUrl;
  mediaObj.mediaType = req.body.mediaType;

  mediaObj
    .save()
    .then((data) => {
      res.send({
        status: 201,
        message: "Media Added!🥳",
        data: data,
      });
    })
    .catch(() => {
      res.send({
          status: 500,
          message: "Internal Server Error",
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
    mediaModel
      .findOne({ _id: req.body._id })
      .then((ExistMedia) => {
        if (ExistMedia == null) {
          console.log("No Media Added!😕");
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: ExistMedia,
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
    mediaModel
      .findOne({ _id: req.body._id })
      .then((ExistMedia) => {
        if (ExistMedia == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          mediaModel
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.send({
                status: 200,
                message: "Media Deleted!🫡",
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

const UpdateMedia = (req, res) => {
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
    mediaModel
      .findOne({ _id: req.body._id })
      .then((ExistMedia) => {
        if (ExistMedia == null) {
          res.send({
            status: 404,
            message: "No Media exists!",
            success: false,
          });
        } else {
          if (req.body.mediaUrl) {
            ExistMedia.mediaUrl = req.body.mediaUrl;
          }
          if (req.body.mediaType) {
            ExistMedia.mediaType = req.body.mediaType;
          }

          ExistMedia.save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Media Updated!🥳",
                data: data,
              });
            })
            .catch((err) => {
              res.send({
                status: 500,
                message: "Internal Server Error",
                success: false,
                err:err,
              });
            });
        }
      })
      .catch((err) => {
        res.send({
          status: 500,
          message: "Internal Server Error",
          success: false,
          err:err,
        });
      });
  }
};

const all = (req, res) => {
  mediaModel
    .find(req.body)
    .then((ExistMedia) => {
      if (ExistMedia == null) {
        res.send({
          status: 404,
          message: "Media Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Medias",
          success: true,
          totalMedia: ExistMedia.length,
          data: ExistMedia,
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
  UpdateMedia,
  all,
};
