import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Zoom } from "react-toastify";
import Apiservices from "../../../Apiservices";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";

const ManageCategory = () => {
  const [data, setdata] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    // axios.post("http://localhost:3000/apis/Category/all")
    Apiservices.ManageCategory()
      .then((res) => {
        console.log(res.data.data);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // HARD DELETE
  const deleteCate = (id) => {
    // console.log("HLO",id);

    const data2 = {
      _id: id,
    };

    Apiservices.DeleteCategory(data2)
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

    const res = await Apiservices.SoftDeleteCategory(data1);
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

      {/* Contact Start */}
      {/* <div
        className="container-fluid contact py-5 wow bounceInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="p-5 bg-light rounded contact-form">
            <div className="row g-4 justify-content-center">
              <div className="col-12">
               
                <h1 className="display-5 mb-0 text-center">Manage Category</h1>
              </div>
              <div className="col-md-6 col-lg-7">
                <div className="layout_padding2-top">
                  <div className="row justify-content-center">
                    <div className="col-md-6 ">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Sno</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Actions</th>
                            <th scope="col">Update</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((el, i) => (
                            <tr key={el._id}>
                              <th scope="row">{i + 1}</th>
                              <td>{el.categoryName}</td>
                              <td>{el.description}</td>
                              <td>
                                  <img
                                    src={ el.image}
                                    width={50}
                                    alt="Image"
                                  />
                                </td>
                              <td>
                                <button
                                  onClick={() => {
                                    deleteCate(el._id);
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
                                    navigate(`/admin/updateCategory/${el._id}`)
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

      <div className="container py-5">
  {/* Page Heading */}
  <div className="text-center mb-5 animated bounceInDown">
    <h1 className="display-5  mb-2">Manage Categories</h1>
    <p className="text-muted mb-0">
      View, update, and manage all project categories.
    </p>
  </div>

  {/* Category List */}
  <div className="row justify-content-center">
    <div className="col-lg-11">

      {data.map((el, i) => (
        <div
          className="card border-0 shadow-sm mb-4 rounded-4 wow bounceInUp"
          key={el._id}
        >
          <div className="card-body p-4">

            <div className="row align-items-center g-4">

              {/* Serial Number */}
              <div className="col-12 col-md-1 text-center">
                <div className="fs-5 fw-bold text-muted">
                  {i + 1}
                </div>
              </div>

              {/* Category Image */}
              <div className="col-12 col-md-2 text-center">
                <img
                  src={el.image}
                  alt={el.categoryName}
                  className="img-fluid rounded-3"
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Category Details */}
              <div className="col-12 col-md-5">
                <h4 className=" mb-2">
                  {el.categoryName}
                </h4>

                <p className="text-muted mb-0">
                  {el.description}
                </p>
              </div>

              {/* Status */}
              <div className="col-6 col-md-2 text-center">
                <p className="fw-semibold mb-2">
                  Status
                </p>

                <div className="form-check form-switch d-flex justify-content-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={el.status}
                    onChange={() =>
                      toggelStatus(el._id, el.status)
                    }
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="col-6 col-md-2">
                <div className="d-flex flex-column gap-2">

                  {/* Edit Button */}
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() =>
                      navigate(`/admin/updateCategory/${el._id}`)
                    }
                  >
                    <i className="fas fa-edit me-2"></i>
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => {
                      deleteCate(el._id);
                    }}
                  >
                    <i className="fas fa-trash me-2"></i>
                    Delete
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</div>
      {/* Contact End */}
    </>
  );
};

export default ManageCategory;
