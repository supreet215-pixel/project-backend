import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import Apiservices from "../../../Apiservices";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

const ManagePitch = () => {
  const [data, setdata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    // axios.post("http://localhost:3000/apis/Pitch/all")
    Apiservices.ManagePitch()
      .then((res) => {
        console.log(res.data.data);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // HARD DELETE
  const deletePitch = (id) => {
    // console.log("HLO",id);

    const data2 = {
      _id: id,
    };

    Apiservices.DeletePitch(data2)
      .then((res) => {
        console.log(res);

        if (res.data.success) {
          toast.success(res.data.message);
          fetch();
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // SOFT DELETE
  const toggelStatus = async (id) => {
    setdata((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: !item.status } : item,
      ),
    );

    const data1 = {
      _id: id,
    };

    const res = await Apiservices.SoftDeletePitch(data1);
    try {
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
      {/* Hero Start */}
      {/* <div className="container-fluid bg-light py-6 my-6 mt-0">
          <div className="container text-center animated bounceInDown">
            <h1 className="display-1 mb-4">Register</h1>
            <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Pages</a>
              </li>
              <li className="breadcrumb-item text-dark" aria-current="page">
                Register
              </li>
            </ol>
          </div>
        </div> */}
      {/* Hero End */}

      {/* Contact Start */}
      <div
        className="container-fluid contact py-6 wow bounceInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="p-5 bg-light rounded contact-form">
            <div className="row g-4 ms-5">
              <div className="col-12">
                {/* <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                    Get in touch
                  </small> */}
                <h1 className="display-5 mb-0 text-center">Manage Pitch</h1>
              </div>
              <div className="col-md-6 col-lg-7">
                <div className="layout_padding2-top">
                  <div className="row">
                    <div className="col-md-6 ">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Sno</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Category</th>
                            <th scope="col">Target Amount</th>
                            <th scope="col">Current Amount</th>
                            <th scope="col">AI Score</th>
                            <th scope="col">Pitch Video</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((el, i) => (
                            <tr key={el._id}>
                              <th scope="row">{i + 1}</th>
                              <td>{el.title}</td>
                              <td>{el.description}</td>
                             
                              <td>{el.category.categoryName}</td>
                              <td>{el.targetAmount}</td>
                              <td>{el.currentAmount}</td>
                              <td>{el.aiScore}</td>
                              <td>
                                  <img
                                    src={ el.pitchVideoUrl}
                                    width={50}
                                    alt="pitchVideoUrl"
                                  />
                                </td>
                              <td>
                                <button
                                  onClick={() => {
                                    deletePitch(el._id);
                                  }}
                                  class="btn btn-danger"
                                >
                                  Delete
                                </button>
                              </td>
                              <td>
                                <Switch
                                  checked={el.status}
                                  onChange={() =>
                                    toggelStatus(el._id, el.status)
                                  }
                                />
                              </td>
                              <td>
                                <button
                                  className="btn btn-secondary"
                                  onClick={() =>
                                    navigate(`/user/updatePitch/${el._id}`)
                                  }
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
  );
};

export default ManagePitch;
