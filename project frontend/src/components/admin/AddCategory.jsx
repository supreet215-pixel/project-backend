import axios from "axios";
import React, { useState } from "react";
import { toast, Zoom } from "react-toastify";
// import Apiservices from "../../../Apiservices";
import { HashLoader } from "react-spinners";
import { addCategory } from "../../services/category";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setimage] = useState();


  const [loading, setLoading] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();

    setLoading(true);
    // console.log(email);
    // console.log(password);

    // const token = sessionStorage.getItem("token");

    // // console.log(token);
    // const head = {
    //   Authorization: token,
    // };

    let data = new FormData();

    data.append("categoryName", categoryName);
    data.append("description", description);
    data.append("image", image);

    // axios.post("http://localhost:3000/apis/Category/add", data,{headers:head})
    addCategory(data)
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          toast.success("Category Added🥳");
          navigate("/admin/manageCategory")
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);

        toast.error("There an error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "9999",
          }}
        >
          <HashLoader size={50} color={"#D4A762"} />
        </div>
      )}

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
      <div
        className="container-fluid contact py-5 wow bounceInUp"
        data-wow-delay="0.1s"
      >
        <div className="container">
          <div className="p-5 bg-light rounded contact-form">
            <div className="row g-4 justify-content-center">
              <div className="col-12">
                <h1 className="display-5 mb-0 text-center">Add Category</h1>
              </div>
              <div className="col-md-6 col-lg-7">
                <form onSubmit={handleForm}>
                  <input
                    type="text"
                    className="w-100 form-control p-3 mb-4 border-primary bg-light"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="w-100 form-control p-3 mb-4 border-primary bg-light"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  <input
                    type="file"
                    className="w-100 form-control p-3 mb-4 border-primary bg-light"
                    placeholder="Image"
                    onChange={(e) => {
                      setimage(e.target.files[0]);
                    }}
                  />
                  <button
                  
                    className="w-100 btn btn-primary form-control p-3 border-primary bg-primary rounded-pill"
                    type="submit"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  );
};

export default AddCategory;
