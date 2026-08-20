const cloudinary = require("cloudinary")
const multer =require("multer")
const InvProfileController= require("../apis/investor_profile/InvProfileController")
const UserProfileController = require("../apis/user_profile/UserProfileController")
const UserController= require("../apis/users/UsersController")
const CommentsController = require("../apis/idea_comments/CommentsController")
const MediaController = require("../apis/idea_media/MediaController")
const InvestmentsController = require("../apis/investments/InvestmentsController")
const PitchController = require("../apis/idea_pitch/PitchController")
const PaymentsController = require("../apis/payments/PaymentsController")
const AdminActionController = require("../apis/admin_action_log/AdminActionController")
const CategoryController = require("../apis/category/CategoryController")
const AiController = require ("../apis/ai controller/AiController")

const router=require("express").Router()


// cloudinary
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// login
router.post("/Users/login",UserController.login)
// register
router.post("/InvProfile/register",InvProfileController.InvesterRegister)
router.post("/UserProfile/register",UserProfileController.UserRegister)

//AI
router.post("/aiCall", AiController.main)



// token checker
router.use(require("../middleware/adminTokenCheck"))
 
// comments
router.post("/Comments/add",CommentsController.add)
router.post("/Comments/single",CommentsController.single)
router.post("/Comments/DeleteOne",CommentsController.DeleteOne)
router.post("/Comments/all",CommentsController.all)
router.post("/Comments/UpdateComment",CommentsController.UpdateComment)

// media
router.post("/Media/add",MediaController.add)
router.post("/Media/single",MediaController.single)
router.post("/Media/DeleteOne",MediaController.DeleteOne)
router.post("/Media/all",MediaController.all)
router.post("/Media/UpdateMedia",MediaController.UpdateMedia)

// investments
router.post("/Investments/add",InvestmentsController.add)
router.post("/Investments/single",InvestmentsController.single)
router.post("/Investments/DeleteOne",InvestmentsController.DeleteOne)
router.post("/Investments/all",InvestmentsController.all)
router.post("/Investments/UpdateInvestments",InvestmentsController.UpdateInvestment)

// pitch
router.post("/Pitch/add",PitchController.add)
router.post("/Pitch/single",PitchController.single)
router.post("/Pitch/DeleteOne",PitchController.DeleteOne)
router.post("/Pitch/all",PitchController.all)
router.post("/Pitch/UpdatePitch",PitchController.UpdatePitch)

// payments
router.post("/Payments/add",PaymentsController.add)
router.post("/Payments/single",PaymentsController.single)
router.post("/Payments/DeleteOne",PaymentsController.DeleteOne)
router.post("/Payments/all",PaymentsController.all)
router.post("/Payments/UpdatePayments",PaymentsController.UpdatePayment)

// Admin Action
router.post("/AdminAction/add",AdminActionController.add)
router.post("/AdminAction/single",AdminActionController.single)
router.post("/AdminAction/DeleteOne",AdminActionController.DeleteOne)
router.post("/AdminAction/all",AdminActionController.all)
router.post("/AdminAction/UpdateAdminAction",AdminActionController.UpdateAdminAction)

// category
router.post("/Category/add",upload.single("image"),CategoryController.add)
router.post("/Category/single",CategoryController.single)
router.post("/Category/DeleteOne",CategoryController.DeleteOne)
router.post("/Category/all",CategoryController.all)
router.post("/Category/UpdateCategory",upload.single("image"),CategoryController.UpdateCategory)
router.post("/Category/softDelete",CategoryController.softDelete)

// User Profile Management (Admin)
router.post("/UserProfile/all", UserProfileController.all)
router.post("/UserProfile/single", UserProfileController.single)
router.post("/UserProfile/softDelete", UserProfileController.softDelete)
router.post("/UserProfile/DeleteOne", UserProfileController.DeleteOne)

// Investor Profile Management (Admin)
router.post("/InvProfile/all", InvProfileController.all)
router.post("/InvProfile/single", InvProfileController.single)
router.post("/InvProfile/softDelete", InvProfileController.softDelete)
router.post("/InvProfile/updateKyc", InvProfileController.updateKyc)
router.post("/InvProfile/DeleteOne", InvProfileController.DeleteOne)

module.exports = router;