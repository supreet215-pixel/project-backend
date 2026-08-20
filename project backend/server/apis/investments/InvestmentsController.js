const investmentsModel = require("./InvestmentsModel");
const pitchModel = require("../idea_pitch/PitchModel");

// Investor adds an investment offer
const add = async (req, res) => {
  let errmsg = [];

  if (!req.body.pitchId) {
    errmsg.push("Pitch is required");
  }
  if (!req.body.amount) {
    errmsg.push("Amount is required");
  }
  if (!req.body.equityPercent) {
    errmsg.push("Equity percentage is required");
  }

  if (errmsg.length > 0) {
    return res.send({
      status: 400,
      message: errmsg,
      success: false,
    });
  }

  try {
    let investmentsObj = new investmentsModel();
    investmentsObj.pitchId = req.body.pitchId;
    investmentsObj.investorId = req.decoded?.userId || req.body.investorId;
    investmentsObj.amount = Number(req.body.amount);
    investmentsObj.equityPercent = Number(req.body.equityPercent);
    investmentsObj.status = "Pending";
    investmentsObj.created_at = Date.now();

    const data = await investmentsObj.save();

    res.send({
      status: 201,
      message: "Investment Offer Submitted Successfully!🎉",
      success: true,
      data: data,
    });
  } catch (err) {
    console.error("Investment Error:", err);
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// Investor views their own investments
const myInvestments = async (req, res) => {
  const investorId = req.decoded?.userId;

  try {
    const data = await investmentsModel
      .find(investorId ? { investorId: investorId } : {})
      .populate({
        path: "pitchId",
        populate: [{ path: "category" }, { path: "ownerId", select: "name email" }],
      })
      .sort({ createdAt: -1 });

    res.send({
      status: 200,
      message: "My Investments fetched",
      success: true,
      total: data.length,
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// User/Entrepreneur views investments received on their pitches
const myPitchInvestments = async (req, res) => {
  const userId = req.decoded?.userId;

  try {
    // Find pitches owned by this user
    let userPitches = [];
    if (userId) {
      userPitches = await pitchModel.find({ ownerId: userId }).select("_id");
    }

    let pitchIds = userPitches.map((p) => p._id);

    let query = {};
    if (pitchIds.length > 0) {
      query = { pitchId: { $in: pitchIds } };
    }

    const data = await investmentsModel
      .find(query)
      .populate("pitchId")
      .populate("investorId", "name email")
      .sort({ createdAt: -1 });

    res.send({
      status: 200,
      message: "Received Investments fetched",
      success: true,
      total: data.length,
      data: data,
    });
  } catch (err) {
    console.error(err);
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// User Approves or Rejects an investment
const updateStatus = async (req, res) => {
  if (!req.body._id || !req.body.status) {
    return res.send({
      status: 400,
      message: "_id and status are required",
      success: false,
    });
  }

  try {
    const investment = await investmentsModel.findById(req.body._id);
    if (!investment) {
      return res.send({
        status: 404,
        message: "Investment not found",
        success: false,
      });
    }

    investment.status = req.body.status; // "Approved" or "Rejected"
    const saved = await investment.save();

    res.send({
      status: 200,
      message: `Investment offer has been ${req.body.status.toLowerCase()}!`,
      success: true,
      data: saved,
    });
  } catch (err) {
    console.error(err);
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// Investor completes payment via Razorpay
const markPaid = async (req, res) => {
  if (!req.body._id) {
    return res.send({
      status: 400,
      message: "_id is required",
      success: false,
    });
  }

  try {
    const investment = await investmentsModel.findById(req.body._id);
    if (!investment) {
      return res.send({
        status: 404,
        message: "Investment not found",
        success: false,
      });
    }

    investment.status = "Paid";
    investment.paymentId = req.body.paymentId || `PAY-${Date.now()}`;
    investment.paymentDate = Date.now();

    await investment.save();

    // Increment pitch currentAmount
    if (investment.pitchId) {
      const pitch = await pitchModel.findById(investment.pitchId);
      if (pitch) {
        const cur = Number(pitch.currentAmount) || 0;
        pitch.currentAmount = String(cur + Number(investment.amount));
        await pitch.save();
      }
    }

    res.send({
      status: 200,
      message: "Payment recorded successfully! Thank you for your investment.",
      success: true,
      data: investment,
    });
  } catch (err) {
    console.error(err);
    res.send({
      status: 500,
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

const single = (req, res) => {
  if (!req.body._id) {
    return res.send({
      status: 400,
      message: "_id is required",
      success: false,
    });
  }

  investmentsModel
    .findOne({ _id: req.body._id })
    .populate("pitchId")
    .populate("investorId")
    .then((data) => {
      if (!data) {
        return res.send({
          status: 404,
          message: "Investment not found",
          success: false,
        });
      }
      res.send({
        status: 200,
        message: "Found",
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

const DeleteOne = (req, res) => {
  if (!req.body._id) {
    return res.send({
      status: 400,
      message: "_id is required",
      success: false,
    });
  }

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
        error: err,
      });
    });
};

const all = (req, res) => {
  investmentsModel
    .find(req.body)
    .populate("pitchId")
    .populate("investorId")
    .sort({ createdAt: -1 })
    .then((data) => {
      res.send({
        status: 200,
        message: "All investments",
        success: true,
        totalInvestment: data.length,
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

const UpdateInvestment = (req, res) => {
  if (!req.body._id) {
    return res.send({
      status: 400,
      message: "_id is required",
      success: false,
    });
  }

  investmentsModel
    .findOne({ _id: req.body._id })
    .then((ExistInvestment) => {
      if (!ExistInvestment) {
        return res.send({
          status: 404,
          message: "No such Investment found!",
          success: false,
        });
      }
      if (req.body.amount) ExistInvestment.amount = Number(req.body.amount);
      if (req.body.equityPercent) ExistInvestment.equityPercent = Number(req.body.equityPercent);
      if (req.body.status) ExistInvestment.status = req.body.status;

      ExistInvestment.save()
        .then((data) => {
          res.send({
            status: 200,
            message: "Investment Updated Successfully!🥳",
            data: data,
            success: true,
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
  myInvestments,
  myPitchInvestments,
  updateStatus,
  UpdateInvestment,
  markPaid,
  single,
  DeleteOne,
  all,
};
