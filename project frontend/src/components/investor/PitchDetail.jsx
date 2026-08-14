import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Apiservices from "../../../Apiservices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PitchDetail = () => {
  const navigate = useNavigate();

  const { _id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pitchVideoUrl, setPitchVideoUrl] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [aiScore, setAiScore] = useState("");

  const getPitch = async () => {
    try {
      const res = await Apiservices.GetPitch({ _id: _id });

      if (res.data.success) {
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setCategory(res.data.data.category);
        setCurrentAmount(res.data.data.currentAmount);
        setPitchVideoUrl(res.data.data.pitchVideoUrl);
        setTargetAmount(res.data.data.targetAmount);
        setAiScore(res.data.data.aiScore);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPitch();
  }, []);

//   const handleForm = async (e) => {
//     e.preventDefault();

//     try {
//       let formData = new FormData();

//       formData.append("_id", _id);
//       formData.append("title", title)
//       formData.append("category", category);
//       formData.append("currentAmount", currentAmount);
//       formData.append("targetAmount", targetAmount);
//       formData.append("pitchVideoUrl", pitchVideoUrl);
//       formData.append("aiScore", aiScore);

//     } catch (err) {
//       console.log(err);
//     }
//   };

  return (
    <>
      {/* About Satrt */}
      <div className="container-fluid py-6">
        <div className="container">


          <div className="row g-5 align-items-center">
            <div className="col-lg-5 wow bounceInUp" data-wow-delay="0.1s">
              <img src={pitchVideoUrl} className="img-fluid rounded" alt="" />
            </div>
            <div className="col-lg-7 wow bounceInUp" data-wow-delay="0.3s">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                About Us
              </small>  
              <h1 className="display-5 mb-4">
                {title}
              </h1>
              <p className="mb-4">
                {description}
              </p>
              <div className="row g-4 text-dark mb-5">
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2" />
                  Current Amount: {currentAmount}
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2" />
                  Target Amount: {targetAmount}
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2" />
                  AI Score: {aiScore}
                </div>
                <div className="col-sm-6">
                  <i className="fas fa-share text-primary me-2" />
                  Delicious Deals for Delicious Meals
                </div>
              </div>
              <a href="" className="btn btn-primary py-3 px-5 rounded-pill">
                About Us
                <i className="fas fa-arrow-right ps-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
    </>
  );
};

export default PitchDetail;
