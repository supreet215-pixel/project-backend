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
      {/* Contact Start */}
      {/* <div
        className="container-fluid contact py-6 wow bounceInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="p-5 bg-light rounded contact-form">
            <div className="row g-4 ms-5">
              <div className="col-12">
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
            </div>
          </div>
        </div>
      </div> */}
      {/* Contact End */}

      <div className="row g-4">
        {data.map((el, i) => (
          <div className="col-8" key={el._id}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-4">
                <div className="row align-items-center g-4">
                  {/* Serial Number */}
                  <div className="col-md-1 text-center">
                    <span className="badge bg-light text-dark fs-6 p-3 rounded-circle">
                      {i + 1}
                    </span>
                  </div>

                  {/* Image / Video */}
                  <div className="col-md-2 text-center">
                    <img
                      src={el.pitchVideoUrl}
                      alt="Pitch"
                      className="img-fluid rounded-3"
                      style={{
                        width: "130px",
                        height: "90px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Pitch Details */}
                  <div className="col-md-5">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      {/* FIXED CATEGORY */}
                      <span className="badge bg-primary text-dark px-3 py-2 rounded-pill">
                        {el.category?.categoryName}
                      </span>
                    </div>

                    <h4 className="mb-2">{el.title}</h4>

                    <p className="text-muted mb-3">{el.description}</p>

                    <div className="row">
                      <div className="col-sm-6">
                        <small className="text-muted d-block">
                          Target Amount
                        </small>

                        <strong>₹ {el.targetAmount}</strong>
                      </div>

                      <div className="col-sm-6">
                        <small className="text-muted d-block">
                          Current Amount
                        </small>

                        <strong>₹ {el.currentAmount}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-md-2">
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => navigate(`/user/updatePitch/${el._id}`)}
                      >
                        <i className="fas fa-pen me-2"></i>
                        Edit
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => deletePitch(el._id)}
                      >
                        <i className="fas fa-trash me-2"></i>
                        Delete
                      </button>

                      <div className="d-flex justify-content-between align-items-center border rounded-3 px-3 py-2">
                        <small>Status</small>

                        <Switch
                          checked={el.status}
                          onChange={() => toggleStatus(el._id, el.status)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ManagePitch;
