import axios from "axios";
import React, { useState } from "react";
import { toast, Zoom } from "react-toastify";
// import Apiservices from "../../Apiservices";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";


const Login = () => {
  const [email, setEmail] = useState("admin@gmail");
  const [Password, setPassword] = useState("123");

  const nav= useNavigate()

  const handleForm = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(Password);

    let data = {
      email: email,
      password: Password,
    };

    // axios.post("http://localhost:3000/apis/Users/login", data)
    login(data) 
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          sessionStorage.setItem("userId", res.data.data.userId);
          sessionStorage.setItem("email", res.data.data.email);
          sessionStorage.setItem("userType", res.data.data.userType);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("isLogin", true);

          // toast.success("Login Successfully")
          // toast.warning("Login Successfully")
          // toast.error("Login Successfully")
          // toast.info("Login Successfully")

          toast.success("Login Succefully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,

            theme: "colored",
            transition: Zoom,
          });

          if (res.data.data.userType == 1) {
            nav("/admin");
          } else if (res.data.data.userType == 2) {
            nav("/investor");
          } else {
            nav("/user");
          }
        } else {
          toast.warning(res.data.massage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,

            theme: "colored",
            transition: Zoom,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <>
        {/* Modal Search Start */}
        <div
          className="modal fade"
          id="searchModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Search by keyword
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control bg-transparent p-3"
                    placeholder="keywords"
                    aria-describedby="search-icon-1"
                  />
                  <span id="search-icon-1" className="input-group-text p-3">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Search End */}
        {/*Start */}
        <div
          className="container-fluid contact py-6 wow bounceInUp"
          data-wow-delay="0.1s"
        >
          <div className="container w-50">
            <div className="p-5 bg-light rounded contact-form">
              <div className="row g-4 justify-content-center">
                <div className="col-12">
                  <h1 className="display-5 mb-0 text-center">Login</h1>
                </div>
                <div className="col-md-6 col-lg-12">
                  <form onSubmit={handleForm}>
                    <input
                      type="email"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Enter Your Email"
                      // value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <input
                      type="password"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Enter Your Password"
                      // value={Password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <button
                      className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*End */}
      </>
    </>
  );
};

export default Login;
