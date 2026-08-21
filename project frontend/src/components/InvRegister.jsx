import axios from "axios";
import React, { useState } from "react";
import { toast, Zoom } from "react-toastify";
// import Apiservices from "../../Apiservices";
import { Link } from "react-router-dom";
import { invRegister } from "../services/auth";
import { useNavigate } from "react-router-dom";

const InvRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [kycStatus, setKycStatus] = useState("");
  const [riskPreference, setRiskPreference] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);

    let data = {
      name: name,
      email: email,
      password: password,
      country: country,
      kycStatus: "Pending",
      riskPreference: riskPreference,
    };

    // axios.post("http://localhost:3000/apis/InvProfile/register", data)
    invRegister(data)
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          toast.success("Investor Added");
          navigate("/investor");
        } else {
          toast.warning(res.data.massage);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error("There an error");
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
        {/* Register Start */}
        <div
          className="container-fluid contact py-6 wow bounceInUp w-50"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-11">
                <div className="py-4 px-4 bg-light rounded contact-form">
                  <h1 className="display-5 mb-4 text-center">Register</h1>
                  <form onSubmit={handleForm}>
                    <input
                      type="text"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <input
                      type="email"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <input
                      type="password"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                    {/* <input
                      type="text"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="KycStatus"
                      value={kycStatus}
                      onChange={(e) => {
                        setKycStatus(e.target.value);
                      }}
                    /> */}
                    <select
                      type="text"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="RiskPreference"
                      value={riskPreference}
                      onChange={(e) => {
                        setRiskPreference(e.target.value);
                      }}
                    >
                      <option>Select RiskPreference</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                    {/* <textarea
                      className="w-100 form-control mb-4 p-3 border-primary bg-light"
                      rows={4}
                      cols={10}
                      placeholder="Your Message"
                      defaultValue={""}
                    /> */}
                    <button
                      className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                      type="submit"
                    >
                      Register
                    </button>

                    <Link to="/User_Register">Register a user</Link>
                  </form>
                </div>
                {/* <div className="col-md-6 col-lg-5">
                  <div>
                    <div className="d-inline-flex w-100 border border-primary p-4 rounded mb-4">
                      <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                      <div className="">
                        <h4>Address</h4>
                        <p>123 Street, New York, USA</p>
                      </div>
                    </div>
                    <div className="d-inline-flex w-100 border border-primary p-4 rounded mb-4">
                      <i className="fas fa-envelope fa-2x text-primary me-4" />
                      <div className="">
                        <h4>Mail Us</h4>
                        <p className="mb-2">info@example.com</p>
                        <p className="mb-0">support@example.com</p>
                      </div>
                    </div>
                    <div className="d-inline-flex w-100 border border-primary p-4 rounded">
                      <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                      <div className="">
                        <h4>Telephone</h4>
                        <p className="mb-2">(+012) 3456 7890 123</p>
                        <p className="mb-0">(+704) 5555 0127 296</p>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}
      </>
    </>
  );
};

export default InvRegister;
