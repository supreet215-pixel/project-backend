import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Apiservices from "../../../Apiservices";
import { toast } from "react-toastify";

const PitchDetail = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const [pitch, setPitch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getPitch = async () => {
    setLoading(true);
    try {
      const res = await Apiservices.GetPitch({ _id: _id });
      if (res.data && res.data.success) {
        setPitch(res.data.data);
      } else {
        toast.error(res.data?.message || "Failed to load pitch details");
      }
    } catch (err) {
      console.error("Error fetching pitch:", err);
      toast.error("Error loading pitch details");
    } finally {
      setLoading(false);
    }
  };

  const getSuggestion = () => {
    if (!pitch) return;
    setAiLoading(true);
    const categoryName = pitch.category?.categoryName || "General";
    const promptText = `Project: ${pitch.title}. Category: ${categoryName}. Target Amount: ₹${pitch.targetAmount}. Current Raised: ₹${pitch.currentAmount}. Description: ${pitch.description}.`;

    Apiservices.getSuggestion({ prompt: promptText })
      .then((res) => {
        if (res.data && res.data.success) {
          setSuggestion(res.data.message);
          toast.success("AI Investment Analysis generated!");
        } else {
          toast.warning(res.data?.message || "Could not generate AI advice");
        }
      })
      .catch((err) => {
        console.error("AI Error:", err);
        toast.error("Failed to connect to AI analysis service");
      })
      .finally(() => {
        setAiLoading(false);
      });
  };

  const copyToClipboard = () => {
    if (!suggestion) return;
    navigator.clipboard.writeText(suggestion);
    setCopied(true);
    toast.info("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  useEffect(() => {
    if (_id) {
      getPitch();
    }
  }, [_id]);

  if (loading) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="spinner-border text-primary" style={{ width: "3.5rem", height: "3.5rem" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-3 text-muted">Loading Pitch Insights...</h4>
      </div>
    );
  }

  if (!pitch) {
    return (
      <div className="container py-5 text-center my-5">
        <div className="card border-0 shadow-sm rounded-4 p-5 mx-auto" style={{ maxWidth: "600px" }}>
          <i className="fas fa-exclamation-circle fa-4x text-warning mb-3"></i>
          <h3 className="fw-bold">Pitch Not Found</h3>
          <p className="text-muted mb-4">The pitch you are looking for does not exist or has been removed.</p>
          <Link to="/investor/viewPitch" className="btn btn-primary rounded-pill px-4">
            <i className="fas fa-arrow-left me-2"></i>Back to Pitches
          </Link>
        </div>
      </div>
    );
  }

  const currentAmt = Number(pitch.currentAmount) || 0;
  const targetAmt = Number(pitch.targetAmount) || 1;
  const fundingPercent = Math.min(Math.round((currentAmt / targetAmt) * 100), 100);
  const remainingAmt = Math.max(targetAmt - currentAmt, 0);

  return (
    <div className="container-fluid py-5 bg-light-subtle">
      <div className="container">
        {/* Navigation Breadcrumb */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <Link
            to="/investor/viewPitch"
            className="btn btn-outline-dark rounded-pill px-3 py-2 btn-sm fw-semibold"
          >
            <i className="fas fa-arrow-left me-2"></i>All Pitches
          </Link>
          <div className="d-flex gap-2 align-items-center">
            {pitch.category?.categoryName && (
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-semibold">
                <i className="fas fa-tag me-1"></i>
                {pitch.category.categoryName}
              </span>
            )}
            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-semibold">
              <i className="fas fa-shield-alt me-1"></i>Verified Opportunity
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="row g-4">
          {/* Left Column: Media, Details & AI Advisor */}
          <div className="col-lg-7">
            {/* Pitch Media Card */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
              <div className="position-relative" style={{ minHeight: "340px", maxHeight: "420px", backgroundColor: "#0f172a" }}>
                {pitch.pitchVideoUrl ? (
                  <img
                    src={pitch.pitchVideoUrl}
                    alt={pitch.title}
                    className="w-100 h-100 object-fit-cover"
                    style={{ maxHeight: "420px", objectFit: "cover" }}
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-center h-100 text-white p-5">
                    <i className="fas fa-lightbulb fa-5x text-muted opacity-50"></i>
                  </div>
                )}
                <div
                  className="position-absolute bottom-0 start-0 end-0 p-3"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                  }}
                >
                  <h2 className="text-white fw-bold mb-1">{pitch.title}</h2>
                  <span className="text-white-50 small">
                    <i className="fas fa-calendar-alt me-1"></i>
                    Published on {pitch.created_at ? new Date(pitch.created_at).toLocaleDateString() : "Recent"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pitch Narrative & Description */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
              <h4 className="fw-bold mb-3 text-dark">
                <i className="fas fa-file-alt text-primary me-2"></i>Executive Summary & Pitch Overview
              </h4>
              <p className="text-secondary fs-6 leading-relaxed mb-4" style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>
                {pitch.description}
              </p>

              <hr className="my-3 text-muted opacity-25" />

              {/* Pitch Highlights Badges */}
              <div className="row g-3 text-center">
                <div className="col-sm-4">
                  <div className="p-3 bg-light rounded-4">
                    <i className="fas fa-wallet fa-2x text-primary mb-2"></i>
                    <h6 className="text-muted small mb-1">Target Capital</h6>
                    <h5 className="fw-bold mb-0">₹{Number(pitch.targetAmount).toLocaleString()}</h5>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="p-3 bg-light rounded-4">
                    <i className="fas fa-chart-line fa-2x text-success mb-2"></i>
                    <h6 className="text-muted small mb-1">Current Backing</h6>
                    <h5 className="fw-bold text-success mb-0">₹{Number(pitch.currentAmount).toLocaleString()}</h5>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="p-3 bg-light rounded-4">
                    <i className="fas fa-percentage fa-2x text-info mb-2"></i>
                    <h6 className="text-muted small mb-1">Goal Achieved</h6>
                    <h5 className="fw-bold text-info mb-0">{fundingPercent}%</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Groq AI Investment Advisor Section */}
            <div
              className="card border-0 shadow-sm rounded-4 p-4 mb-4"
              style={{
                background: "linear-gradient(135deg, #f8faff 0%, #eef4ff 100%)",
                border: "1px solid #dbeafe",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                    style={{ width: "45px", height: "45px" }}
                  >
                    <i className="fas fa-robot fa-lg"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-dark">Groq AI Investment Advisor</h5>
                    <span className="text-muted small">Powered by high-speed LLaMA 3.3 Intelligence</span>
                  </div>
                </div>

                <button
                  onClick={getSuggestion}
                  disabled={aiLoading}
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-sm"
                >
                  {aiLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Analyzing Pitch...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sparkles me-2"></i>
                      {suggestion ? "Regenerate Analysis" : "Generate Investment Insight"}
                    </>
                  )}
                </button>
              </div>

              {suggestion ? (
                <div className="bg-white rounded-4 p-4 shadow-sm border mt-3 animated fadeIn">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-1 rounded-pill">
                      <i className="fas fa-check-circle me-1"></i>AI Verdict & Risk Assessment
                    </span>
                    <button
                      onClick={copyToClipboard}
                      className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                      title="Copy advice"
                    >
                      <i className={`fas ${copied ? "fa-check text-success" : "fa-copy"} me-1`}></i>
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="text-dark fs-6 mb-0 mt-2" style={{ lineHeight: "1.6" }}>
                    {suggestion}
                  </p>
                </div>
              ) : (
                <p className="text-muted small mb-0 mt-2">
                  <i className="fas fa-info-circle me-1 text-primary"></i>
                  Click <strong>Generate Investment Insight</strong> to get an instant AI-powered breakdown of this idea's potential and suitability for funding.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Funding Progress & Investment Actions */}
          <div className="col-lg-5">
            {/* Funding Progress Card */}
            <div className="card border-0 shadow rounded-4 p-4 mb-4 bg-white sticky-top" style={{ top: "90px", zIndex: 10 }}>
              <div className="d-flex justify-content-between align-items-baseline mb-2">
                <h3 className="fw-bold text-dark mb-0">
                  ₹{Number(pitch.currentAmount).toLocaleString()}
                </h3>
                <span className="text-muted small">raised of ₹{Number(pitch.targetAmount).toLocaleString()} goal</span>
              </div>

              {/* Progress Bar */}
              <div className="progress rounded-pill mb-3" style={{ height: "12px", backgroundColor: "#e2e8f0" }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success rounded-pill"
                  role="progressbar"
                  style={{ width: `${fundingPercent}%` }}
                  aria-valuenow={fundingPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>

              <div className="d-flex justify-content-between text-muted small mb-4">
                <span>
                  <strong className="text-dark">{fundingPercent}%</strong> Funded
                </span>
                <span>
                  <strong className="text-dark">₹{remainingAmt.toLocaleString()}</strong> Remaining
                </span>
              </div>

              {/* Invest Action Button */}
              <button
                onClick={() =>
                  navigate(`/investor/InvestmentPage?pitchId=${pitch._id}`, {
                    state: { pitchId: pitch._id },
                  })
                }
                className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold shadow mb-3"
                style={{ fontSize: "1.1rem" }}
              >
                <i className="fas fa-hand-holding-usd me-2"></i>
                Invest in this Project
              </button>

              {/* Security & Benefits Badges */}
              <div className="bg-light rounded-4 p-3 mb-3">
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-lock text-success me-3 fs-5"></i>
                  <div className="small">
                    <strong>100% Secure & Escrow Protected</strong>
                    <div className="text-muted">Funds released according to project milestones.</div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="fas fa-file-contract text-primary me-3 fs-5"></i>
                  <div className="small">
                    <strong>Transparent Equity & Agreement</strong>
                    <div className="text-muted">Direct terms with the founder.</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-check-circle text-info me-3 fs-5"></i>
                  <div className="small">
                    <strong>KYC & Platform Verified</strong>
                    <div className="text-muted">Reviewed under IdeaFund standards.</div>
                  </div>
                </div>
              </div>

              {/* Creator Info Card */}
              {pitch.ownerId && (
                <div className="border rounded-4 p-3 d-flex align-items-center">
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 me-3"
                    style={{ width: "48px", height: "48px" }}
                  >
                    {pitch.ownerId.name ? pitch.ownerId.name.charAt(0).toUpperCase() : "F"}
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">{pitch.ownerId.name || "Project Founder"}</h6>
                    <span className="text-muted small">{pitch.ownerId.email || "Platform Entrepreneur"}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDetail;
