import axios from "axios";
import React, { useState } from "react";
import { toast, Zoom } from "react-toastify";
// import Apiservices from "../../Apiservices";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../services/auth";


const UserRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  // const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    // console.log(email);
    // console.log(password);

    let data = {
      name: name,
      email: email,
      password: password,
      country: country,
      // occupation: occupation,
      address: address,
      contact: contact,
    };

    userRegister(data)
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          toast.success("User Added");
          navigate(`/user`)
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
        {/* Contact Start */}
        {/* <div
          className="container-fluid contact py-5 wow bounceInUp"
          data-wow-delay="0.1s"
        >
          <div className="container w-50">
            <div className="p-5 bg-light rounded contact-form">
              <div className="row g-4 justify-content-center">
                <div className="col-12">
                  <h1 className="display-5 mb-0 text-center">Register</h1>
                </div>
                <div className="col-md-6 col-lg-7">
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
                    <input
                      type="text"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="occupation"
                      value={occupation}
                      onChange={(e) => {
                        setOccupation(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="contact"
                      value={contact}
                      onChange={(e) => {
                        setContact(e.target.value);
                      }}
                    />
                    <button
                      className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                      type="submit"
                    >
                      Register
                    </button>
                    <Link to="/Investor_Register">Register as an Investor</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div
          className="container-fluid contact py-5 wow bounceInUp"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="row justify-content-center">
              {/* Controls complete outer box width */}
              <div className="col-12 col-md-9 col-lg-7">
                <div className="py-4 px-4 bg-light rounded contact-form">
                  <div className="text-center mb-4">
                    <h1 className="display-5">Register</h1>
                  </div>

                  <form onSubmit={handleForm}>
                    <div className="row g-4">
                      {/* Name */}
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="w-100 form-control p-3 border-primary bg-light"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      {/* Email */}
                      <div className="col-12 col-md-6">
                        <input
                          type="email"
                          className="w-100 form-control p-3 border-primary bg-light"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      {/* Password */}
                      <div className="col-12 col-md-6">
                        <input
                          type="password"
                          className="w-100 form-control p-3 border-primary bg-light"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {/* Country */}
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="w-100 form-control p-3 border-primary bg-light"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>

                      {/* Occupation */}
                      {/* <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="w-100 form-control p-3 border-primary bg-light"
                          placeholder="occupation"
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                        />
                      </div> */}

                      {/* Address */}
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="w-100 form-control p-3 border-primary bg-light"
                          placeholder="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      {/* Contact */}
                      <div className="col-12 col-md-6">
                        <input
                          type="text"
                          className="w-100 form-control p-3 border-primary bg-light"
                          placeholder="contact"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Register Button */}
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="w-100 btn btn-primary rounded-pill py-3 mb-2"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <Link to="/Investor_Register" className="mt-2 mb-0">Register as an Investor</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}
      </>
    </>
  );
};

export default UserRegister;
