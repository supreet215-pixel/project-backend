import { BrowserRouter, Route, Routes } from "react-router-dom";
import Master from "./layout/Master";
import Home from "./components/Home";
import Login from "./components/Login";
import InvRegister from "./components/InvRegister";
import UserRegister from "./components/UserRegister";
import { ToastContainer, Zoom } from "react-toastify";
////////////////////////////////////////////////////////////////////////////////////
import AdminMaster from "./layout/adminLayout/Master";
import AdminDashboard from "./components/admin/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";
import ManageCategory from "./components/admin/ManageCategory";
import UpdateCategory from "./components/admin/UpdateCategory"
////////////////////////////////////////////////////////////////////////////////////
import UserMaster from "./layout/userLayout/Master";
import UserDashboard from "./components/user/userDashboard";
import AddPitch from "./components/user/AddPitch";
import ManagePitch from "./components/user/ManagePitch";
////////////////////////////////////////////////////////////////////////////////////
import InvestorMaster from "./layout/investorLayout/Master";
import InvestorDashboard from "./components/investor/InvestorDashboard";
import ViewPitch from "./components/investor/ViewPitch";
import PitchDetail from "./components/investor/PitchDetail";
import InvestmentPage from "./components/investor/InvestmentPage";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Investor_Register" element={<InvRegister />} />
            <Route path="/User_Register" element={<UserRegister />} />

          </Route>

          {/* admin  */}
          <Route path="/admin" element={<AdminMaster />}>
            <Route index element={<AdminDashboard />} />
            <Route path="/admin/addCategory" element={<AddCategory />} />
            <Route path="/admin/manageCategory" element={<ManageCategory />} />
            <Route path='/admin/updateCategory/:_id' element={<UpdateCategory/>}/>
          </Route>

          {/* user */}
          <Route path="/user" element={<UserMaster />}>
            <Route index element={<UserDashboard />} />
            <Route path="/user/addPitch" element={<AddPitch />} />
            <Route path="/user/managePitch" element={<ManagePitch />} />
          </Route>

          {/* investor */}
          <Route path="/investor" element={<InvestorMaster />}>
            <Route index element={<InvestorDashboard />} />
            <Route path="/investor/viewPitch" element={<ViewPitch />} />
            <Route path="/investor/pitchDetail/:_id" element={<PitchDetail />} />
            <Route path="/investor/InvestmentPage" element={<InvestmentPage />} />
            
          </Route>

        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
