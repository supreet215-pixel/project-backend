import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import Apiservices from "../../../Apiservices";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

const InvestmentPage = ()=>{
    return(
    <>
    <div
          className="container contact py-5 wow bounceInUp"
          data-wow-delay="0.1s"
        >
          <div className="container w-50">
            <div className="p-4 bg-light rounded contact-form">
              <div className="row g-5 justify-content-center">
                <div className="col-12">
                  <h1 className="display-5 mb-0 text-center">Add Investment</h1>
                </div>
                <div className="col-md-6 col-lg-12">
                  <form>
                    <input
                      type="number"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Investment Amount"
                    />
                    <input
                      type="number"
                      className="w-100 form-control p-3 mb-4 border-primary bg-light"
                      placeholder="Equity Percentage"
                    />
                    <button
                      className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                      type="submit"
                    >
                      Invest Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
)
}

export default InvestmentPage