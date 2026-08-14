const { uploadImg } = require("../../utilities/Helper");
const categoryModel = require("./CategoryModel");

const add = (req, res) => {
  // console.log("HLo");

  // let categoryObj = new categoryModel();
  // categoryObj.categoryName = req.body.categoryName;
  // categoryObj.description = req.body.description;
  // categoryObj.image = req.body.image;

  let errmsg = [];

  if (!req.body.categoryName) {
    errmsg.push("Name is required");
  }

  if (!req.file) {
    return res.send({
      status: 201,
      message: "Image is required",
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
    categoryModel
      .findOne({ categoryName: req.body.categoryName })
      .then(async (Data) => {
        if (Data == null) {
          let categoryObj = new categoryModel();

          categoryObj.categoryName = req.body.categoryName;
          categoryObj.description = req.body.description;
          // categoryObj.image = req.body.image;

          try {
            let url = await uploadImg(req.file.buffer);
            categoryObj.image = url;
          } catch (err) {

            console.log(err);
            
            return res.send({
              success: false,
              status: 403,
              message: "Cloudinary error😕",
              err: err,
            });
          }

          // console.log(categoryObj);

          categoryObj.save().then((data) => {
            res.send({
              status: 201,
              message: "Category Added!🥳",
              data: data,
              success:true,
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
    categoryModel
      .findOne({ _id: req.body._id })
      .then((ExistCategory) => {
        if (ExistCategory == null) {
          console.log("No Category Added!😕");
        } else {
          res.send({
            status: 200,
            message: "Found",
            success: true,
            data: ExistCategory,
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
    categoryModel
      .findOne({ _id: req.body._id })
      .then((ExistCategory) => {
        if (ExistCategory == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          categoryModel
            .deleteOne({ _id: req.body._id })
            .then(() => {
              res.send({
                status: 200,
                message: "Category Deleted!🫡",
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

const softDelete = (req, res) => {
  // let ErrMsg = [];

  // if (!req.body._id) {
  //   ErrMsg.push("_id is required");
  // }

  if (!req.body._id) {
    res.send({
      status: 404,
      message: "_id is required",
      success: false,
    });
  } else {
    categoryModel
      .findOne({ _id: req.body._id })
      .then((ExistCategory) => {
        if (ExistCategory == null) {
          res.send({
            status: 404,
            message: "Not Found",
            success: false,
          });
        } else {
          console.log(ExistCategory);
          ExistCategory.status = !ExistCategory.status;

          ExistCategory.save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Status Changed",
                data: data,
              });
            })
            .catch((err) => {
              console.log(err);
            });

          // ExistCate.status= req.body.status
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

const UpdateCategory = (req, res) => {

  console.log(req.body);
  
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
    categoryModel
      .findOne({ _id: req.body._id })
      .then(async(ExistCategory) => {
        if (ExistCategory == null) {
          res.send({
            status: 404,
            message: "No Category!",
            success: false,
          });
        } else {
          if (req.body.category) {
            ExistCategory.categoryName = req.body.categoryName;
            ExistCategory.description = req.body.description;
          }
          if(req.file){
            try{
              let url = await uploadImg(req.file.buffer)
              ExistCategory.image = url;
            }catch(err){
              console.log(err)
              return res.send({
                success:false,
                status:403,
                message:"Cloudinary error",
                err:err,
              })
            }
          }

          ExistCategory.save()
            .then((data) => {
              res.send({
                status: 201,
                message: "Category Updated!🥳",
                data: data,
                success:true
              });
            })
            .catch(() => {
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

const all = (req, res) => {
  categoryModel
    .find(req.body)
    .then((ExistCategory) => {
      if (ExistCategory == null) {
        res.send({
          status: 404,
          message: "Category Not Found",
          success: false,
        });
      } else {
        res.send({
          status: 200,
          message: "All Category",
          success: true,
          totalCategory: ExistCategory.length,
          data: ExistCategory,
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
  softDelete,
  UpdateCategory,
  all,
};
