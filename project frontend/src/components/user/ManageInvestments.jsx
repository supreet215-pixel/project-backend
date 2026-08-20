import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Apiservices from "../../../Apiservices";
import { Link } from "react-router-dom";

const ManageInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);

  useEffect(() => {
    fetchReceivedInvestments();
  }, []);

  const fetchReceivedInvestments = () => {
    setLoading(true);
    Apiservices.myPitchInvestments({})
      .then((res) => {
        if (res.data && res.data.success) {
          setInvestments(res.data.data || []);
        } else {
          toast.error(res.data?.message || "Failed to load received investments");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error connecting to server");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStatusUpdate = (investmentId, newStatus) => {
    Apiservices.updateInvestmentStatus({
      _id: investmentId,
      status: newStatus,
    })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success(`Investment offer ${newStatus.toLowerCase()} successfully!`);
          setInvestments((prev) =>
            prev.map((item) =>
              item._id === investmentId ? { ...item, status: newStatus } : item
            )
          );
          if (selectedOffer && selectedOffer._id === investmentId) {
            setSelectedOffer((prev) => ({ ...prev, status: newStatus }));
          }
        } else {
          toast.warning(res.data?.message || "Failed to update investment status");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating investment status");
      });
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return (
          <span className="badge bg-success px-3 py-2 rounded-pill">
            <i className="fas fa-check-double me-1"></i>Funded & Paid via Razorpay
          </span>
        );
      case "approved":
        return (
          <span className="badge bg-primary px-3 py-2 rounded-pill">
            <i className="fas fa-thumbs-up me-1"></i>Approved (Awaiting Investor Payment)
          </span>
        );
      case "rejected":
        return (
          <span className="badge bg-danger px-3 py-2 rounded-pill">
            <i className="fas fa-times-circle me-1"></i>Offer Rejected
          </span>
        );
      case "pending":
      default:
        return (
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
            <i className="fas fa-clock me-1"></i>Pending Your Approval
          </span>
        );
    }
  };

  // Filtered investments
  const filtered = investments.filter((item) => {
    const pitchTitle = item.pitchId?.title || "";
    const investorName = item.investorId?.name || "";
    const investorEmail = item.investorId?.email || "";

    const matchesSearch =
      pitchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investorEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      item.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalFunded = investments
    .filter((i) => i.status?.toLowerCase() === "paid")
    .reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const pendingOffers = investments.filter(
    (i) => !i.status || i.status.toLowerCase() === "pending"
  ).length;

  const approvedOffers = investments.filter(
    (i) => i.status?.toLowerCase() === "approved"
  ).length;

  const paidOffers = investments.filter(
    (i) => i.status?.toLowerCase() === "paid"
  ).length;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animated bounceInDown">
        <div>
          <h1 className="display-5 mb-1">Manage Received Investments</h1>
          <p className="text-muted mb-0">
            Review investment proposals from verified investors, approve offers, and track funding payments.
          </p>
        </div>
        <Link to="/user/managePitch" className="btn btn-outline-dark rounded-pill px-4 py-2">
          <i className="fas fa-list me-2"></i>My Idea Pitches
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Total Capital Funded</h6>
            <h3 className="fw-bold text-success mb-0">₹{totalFunded.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Pending Review</h6>
            <h3 className="fw-bold text-warning mb-0">{pendingOffers}</h3>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Approved Offers</h6>
            <h3 className="fw-bold text-primary mb-0">{approvedOffers}</h3>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Completed Payments</h6>
            <h3 className="fw-bold text-dark mb-0">{paidOffers}</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search by pitch title, investor name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select bg-light border-0"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Offers</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="paid">Funded & Paid</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col-md-2 text-md-end">
            <button className="btn btn-outline-primary w-100" onClick={fetchReceivedInvestments}>
              <i className="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Offers Listings */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted mt-3">Loading investment proposals...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <i className="fas fa-hand-holding-usd fa-3x text-muted mb-3"></i>
          <h4>No Investment Proposals Yet</h4>
          <p className="text-muted mb-4">
            {searchTerm
              ? `No proposals matching "${searchTerm}"`
              : "When investors submit funding offers for your pitches, they will appear here."}
          </p>
          <Link to="/user/addPitch" className="btn btn-primary rounded-pill px-4 mx-auto">
            <i className="fas fa-plus me-2"></i>Create New Idea Pitch
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((item) => {
            const pitch = item.pitchId || {};
            const investor = item.investorId || {};
            const isPending = !item.status || item.status.toLowerCase() === "pending";
            const isApproved = item.status?.toLowerCase() === "approved";
            const isPaid = item.status?.toLowerCase() === "paid";

            return (
              <div className="col-12" key={item._id}>
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white wow bounceInUp">
                  <div className="row align-items-center g-4">
                    {/* Pitch Media Thumbnail */}
                    <div className="col-md-3 text-center">
                      {pitch.pitchVideoUrl ? (
                        <img
                          src={pitch.pitchVideoUrl}
                          alt={pitch.title}
                          className="rounded-4 w-100 object-fit-cover shadow-sm"
                          style={{ height: "130px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="rounded-4 bg-light d-flex align-items-center justify-content-center w-100"
                          style={{ height: "130px" }}
                        >
                          <i className="fas fa-lightbulb fa-3x text-muted"></i>
                        </div>
                      )}
                    </div>

                    {/* Pitch & Investor Info */}
                    <div className="col-md-5">
                      <span className="badge bg-light text-dark border mb-1">
                        <i className="fas fa-bullhorn me-1 text-primary"></i>
                        {pitch.title || "Pitch Project"}
                      </span>

                      <div className="d-flex align-items-center mt-2 mb-2">
                        <div
                          className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-5 me-2"
                          style={{ width: "42px", height: "42px", minWidth: "42px" }}
                        >
                          {investor.name ? investor.name.charAt(0).toUpperCase() : "I"}
                        </div>
                        <div>
                          <h5 className="fw-bold mb-0 text-dark">{investor.name || "Interested Investor"}</h5>
                          <span className="text-muted small">{investor.email || "No email available"}</span>
                        </div>
                      </div>

                      <div className="d-flex gap-3 text-muted small mt-2">
                        <div>
                          <i className="fas fa-coins text-success me-1"></i>
                          <strong>Offered:</strong> ₹{Number(item.amount).toLocaleString()}
                        </div>
                        <div>
                          <i className="fas fa-percentage text-info me-1"></i>
                          <strong>Equity:</strong> {item.equityPercent}%
                        </div>
                      </div>
                    </div>

                    {/* Status & Action Buttons */}
                    <div className="col-md-4 text-md-end">
                      <div className="mb-3">{getStatusBadge(item.status)}</div>

                      {/* Pending: Approve / Reject Controls */}
                      {isPending && (
                        <div className="d-flex gap-2 justify-content-md-end flex-wrap">
                          <button
                            onClick={() => handleStatusUpdate(item._id, "Approved")}
                            className="btn btn-success rounded-pill px-4 fw-semibold"
                          >
                            <i className="fas fa-check me-1"></i>Approve Offer
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(item._id, "Rejected")}
                            className="btn btn-outline-danger rounded-pill px-3"
                          >
                            <i className="fas fa-times me-1"></i>Reject
                          </button>
                        </div>
                      )}

                      {/* Approved: Awaiting Investor Payment */}
                      {isApproved && (
                        <div className="small text-muted text-md-end">
                          <i className="fas fa-info-circle me-1 text-primary"></i>
                          Offer approved! Investor can now pay securely via Razorpay.
                        </div>
                      )}

                      {/* Paid: Payment Details */}
                      {isPaid && (
                        <div className="bg-light rounded-3 p-2 small text-start">
                          <div>
                            <i className="fas fa-check-circle text-success me-1"></i>
                            <strong>Payment Received:</strong> ₹{Number(item.amount).toLocaleString()}
                          </div>
                          {item.paymentId && (
                            <div className="text-muted mt-1">
                              <strong>Razorpay ID:</strong> <code>{item.paymentId}</code>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageInvestments;
