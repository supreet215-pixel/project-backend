import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Apiservices from "../../../Apiservices";
import { useNavigate, useLocation, Link } from "react-router-dom";

const InvestmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pitches, setPitches] = useState([]);
  const [selectedPitchId, setSelectedPitchId] = useState("");
  const [amount, setAmount] = useState("");
  const [equityPercent, setEquityPercent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPitches, setLoadingPitches] = useState(true);

  useEffect(() => {
    // Check if pitchId passed in state or query
    const searchParams = new URLSearchParams(location.search);
    const queryPitchId = searchParams.get("pitchId") || location.state?.pitchId;
    if (queryPitchId) {
      setSelectedPitchId(queryPitchId);
    }

    fetchPitches(queryPitchId);
  }, [location]);

  const fetchPitches = (preselectedId) => {
    setLoadingPitches(true);
    Apiservices.AllPitch({})
      .then((res) => {
        if (res.data && res.data.success) {
          const list = res.data.data || [];
          setPitches(list);
          if (!preselectedId && list.length > 0 && !selectedPitchId) {
            setSelectedPitchId(list[0]._id);
          }
        } else {
          toast.error("Failed to load pitches");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading pitches");
      })
      .finally(() => {
        setLoadingPitches(false);
      });
  };

  const selectedPitch = pitches.find((p) => p._id === selectedPitchId);

  const handleForm = (e) => {
    e.preventDefault();

    if (!selectedPitchId) {
      toast.warning("Please select an idea pitch to invest in!");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      toast.warning("Please enter a valid investment amount!");
      return;
    }
    if (!equityPercent || Number(equityPercent) <= 0 || Number(equityPercent) > 100) {
      toast.warning("Please enter a valid equity percentage (1-100%)!");
      return;
    }

    setLoading(true);

    const investmentData = {
      pitchId: selectedPitchId,
      amount: Number(amount),
      equityPercent: Number(equityPercent),
    };

    Apiservices.addInvestment(investmentData)
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("Investment Offer Sent Successfully!🎉");
          navigate("/investor/manageInvestments");
        } else {
          toast.warning(res.data?.message || "Failed to submit investment offer");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error submitting investment offer");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setPresetAmount = (val) => {
    setAmount(val);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5 animated bounceInDown">
        <h1 className="display-5 mb-2">Submit Investment Offer</h1>
        <p className="text-muted mb-0">
          Back groundbreaking ideas, propose your terms, and partner directly with visionary founders.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        {/* Left Side: Pitch Preview */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <h4 className="fw-bold mb-3 text-dark">
              <i className="fas fa-lightbulb text-primary me-2"></i>Selected Idea Pitch
            </h4>

            {loadingPitches ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-2">Loading pitches...</p>
              </div>
            ) : selectedPitch ? (
              <div>
                {selectedPitch.pitchVideoUrl && (
                  <div className="rounded-3 overflow-hidden mb-3" style={{ maxHeight: "200px" }}>
                    <img
                      src={selectedPitch.pitchVideoUrl}
                      alt={selectedPitch.title}
                      className="w-100 h-100 object-fit-cover"
                      style={{ objectFit: "cover", height: "180px" }}
                    />
                  </div>
                )}

                <h5 className="fw-bold text-dark mb-1">{selectedPitch.title}</h5>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 mb-3">
                  {selectedPitch.category?.categoryName || "General Category"}
                </span>

                <p className="text-muted small mb-4" style={{ lineHeight: "1.6" }}>
                  {selectedPitch.description?.length > 180
                    ? `${selectedPitch.description.slice(0, 180)}...`
                    : selectedPitch.description}
                </p>

                <div className="p-3 bg-light rounded-3 mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Target Funding:</span>
                    <strong className="text-dark">₹{Number(selectedPitch.targetAmount).toLocaleString()}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted small">Current Backing:</span>
                    <strong className="text-success">₹{Number(selectedPitch.currentAmount).toLocaleString()}</strong>
                  </div>
                </div>

                <Link
                  to={`/investor/pitchDetail/${selectedPitch._id}`}
                  className="btn btn-outline-primary btn-sm w-100 rounded-pill"
                >
                  <i className="fas fa-eye me-1"></i>View Full Pitch & AI Analysis
                </Link>
              </div>
            ) : (
              <div className="text-center py-4 text-muted">
                <i className="fas fa-info-circle fa-2x mb-2"></i>
                <p>Please select a pitch from the dropdown.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Investment Form */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
            <h4 className="fw-bold mb-4 text-dark">
              <i className="fas fa-hand-holding-usd text-primary me-2"></i>Investment Proposal
            </h4>

            <form onSubmit={handleForm}>
              {/* Select Pitch Dropdown */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">Choose Idea Pitch</label>
                <select
                  className="form-select form-select-lg bg-light border-0"
                  value={selectedPitchId}
                  onChange={(e) => setSelectedPitchId(e.target.value)}
                  required
                >
                  <option value="">-- Select a Pitch --</option>
                  {pitches.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title} (Goal: ₹{Number(p.targetAmount).toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Investment Amount */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">
                  Investment Amount (₹ INR)
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-light border-0 text-muted fw-bold">₹</span>
                  <input
                    type="number"
                    className="form-control bg-light border-0"
                    placeholder="e.g. 50000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="100"
                    required
                  />
                </div>

                {/* Quick Presets */}
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <span className="small text-muted align-self-center me-1">Quick:</span>
                  {[10000, 25000, 50000, 100000].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      className="btn btn-sm btn-outline-secondary rounded-pill"
                      onClick={() => setPresetAmount(preset)}
                    >
                      ₹{preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equity Percentage */}
              <div className="mb-4">
                <label className="form-label fw-semibold text-dark">
                  Requested Equity Percentage (%)
                </label>
                <div className="input-group input-group-lg">
                  <input
                    type="number"
                    step="0.1"
                    className="form-control bg-light border-0"
                    placeholder="e.g. 5"
                    value={equityPercent}
                    onChange={(e) => setEquityPercent(e.target.value)}
                    min="0.1"
                    max="100"
                    required
                  />
                  <span className="input-group-text bg-light border-0 text-muted fw-bold">%</span>
                </div>
                <div className="form-text text-muted">
                  The founder will review your proposed equity share upon submission.
                </div>
              </div>

              {/* Info Note */}
              <div className="alert alert-warning border-0 rounded-4 p-3 mb-4 small">
                <i className="fas fa-shield-alt me-2 text-warning"></i>
                <strong>Payment Protection:</strong> You will not be charged now. Once the entrepreneur reviews and <strong>Approves</strong> your offer, you will be invited to complete payment securely via Razorpay.
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-100 rounded-pill py-3 fw-bold shadow"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Submitting Offer...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane me-2"></i>Send Investment Offer
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;