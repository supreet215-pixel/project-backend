import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Apiservices from "../../../Apiservices";
import { Link, useNavigate } from "react-router-dom";

const MyInvestments = () => {
  const navigate = useNavigate();
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    fetchMyInvestments();
  }, []);

  const fetchMyInvestments = () => {
    setLoading(true);
    Apiservices.myInvestments({})
      .then((res) => {
        if (res.data && res.data.success) {
          setInvestments(res.data.data || []);
        } else {
          toast.error(res.data?.message || "Failed to load investments");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error loading investments");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRazorpayPayment = (investment) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    const pitchTitle = investment.pitchId?.title || "Idea Pitch";
    const amountInPaise = Number(investment.amount) * 100;

    const options = {
      key: "rzp_test_TDKU6vfIJHggqf", // Standard Razorpay Demo Test Key
      amount: amountInPaise,
      currency: "INR",
      name: "IdeaFund Platform",
      description: `Investment in ${pitchTitle} (${investment.equityPercent}% Equity)`,
      handler: function (response) {
        // Payment Succeeded on Frontend Razorpay Modal
        const paymentId = response.razorpay_payment_id || `PAY_${Date.now()}`;
        toast.info("Payment received, confirming transaction with server...");

        Apiservices.markInvestmentPaid({
          _id: investment._id,
          paymentId: paymentId,
        })
          .then((res) => {
            if (res.data && res.data.success) {
              toast.success("Investment Payment Completed Successfully!🎉");
              // Update local list
              setInvestments((prev) =>
                prev.map((item) =>
                  item._id === investment._id
                    ? {
                        ...item,
                        status: "Paid",
                        paymentId: paymentId,
                        paymentDate: new Date(),
                      }
                    : item
                )
              );
              // Show receipt
              setSelectedReceipt({
                ...investment,
                status: "Paid",
                paymentId: paymentId,
                paymentDate: new Date(),
              });
            } else {
              toast.warning(res.data?.message || "Payment confirmation failed");
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error("Error finalizing payment with backend");
          });
      },
      prefill: {
        name: sessionStorage.getItem("name") || "Investor",
        email: sessionStorage.getItem("email") || "investor@ideafund.com",
      },
      notes: {
        investmentId: investment._id,
        pitchTitle: pitchTitle,
      },
      theme: {
        color: "#D4A762",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      toast.error(`Payment failed: ${response.error.description || "Transaction cancelled"}`);
    });
    rzp.open();
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return <span className="badge bg-success px-3 py-2 rounded-pill"><i className="fas fa-check-circle me-1"></i>Paid & Completed</span>;
      case "approved":
        return <span className="badge bg-primary px-3 py-2 rounded-pill"><i className="fas fa-thumbs-up me-1"></i>Approved (Awaiting Payment)</span>;
      case "rejected":
        return <span className="badge bg-danger px-3 py-2 rounded-pill"><i className="fas fa-times-circle me-1"></i>Offer Rejected</span>;
      case "pending":
      default:
        return <span className="badge bg-warning text-dark px-3 py-2 rounded-pill"><i className="fas fa-clock me-1"></i>Under Founder Review</span>;
    }
  };

  // Filtered investments
  const filtered = investments.filter((item) => {
    const title = item.pitchId?.title || "";
    const category = item.pitchId?.category?.categoryName || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      item.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const totalInvested = investments
    .filter((i) => i.status?.toLowerCase() === "paid")
    .reduce((sum, i) => sum + (Number(i.amount) || 0), 0);

  const pendingOffers = investments.filter((i) => !i.status || i.status.toLowerCase() === "pending").length;
  const approvedOffers = investments.filter((i) => i.status?.toLowerCase() === "approved").length;
  const completedOffers = investments.filter((i) => i.status?.toLowerCase() === "paid").length;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3 animated bounceInDown">
        <div>
          <h1 className="display-5 mb-1">My Investments</h1>
          <p className="text-muted mb-0">
            Track your funding proposals, review founder approvals, and complete payments securely.
          </p>
        </div>
        <Link to="/investor/InvestmentPage" className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">
          <i className="fas fa-plus me-2"></i>New Investment Offer
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Total Deployed Capital</h6>
            <h3 className="fw-bold text-success mb-0">₹{totalInvested.toLocaleString()}</h3>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Ready for Payment</h6>
            <h3 className="fw-bold text-primary mb-0">{approvedOffers}</h3>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Pending Founder Review</h6>
            <h3 className="fw-bold text-warning mb-0">{pendingOffers}</h3>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-0 shadow-sm rounded-4 p-3 text-center bg-white h-100">
            <h6 className="text-muted small mb-1">Completed Investments</h6>
            <h3 className="fw-bold text-dark mb-0">{completedOffers}</h3>
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
                placeholder="Search by project name, category..."
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
              <option value="pending">Pending Review</option>
              <option value="approved">Approved (Payable)</option>
              <option value="paid">Paid & Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="col-md-2 text-md-end">
            <button className="btn btn-outline-primary w-100" onClick={fetchMyInvestments}>
              <i className="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Investment Listings */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted mt-3">Loading your investments...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
          <h4>No Investment Offers Found</h4>
          <p className="text-muted mb-4">
            {searchTerm
              ? `No investment matches for "${searchTerm}"`
              : "You have not submitted any investment offers yet."}
          </p>
          <Link to="/investor/viewPitch" className="btn btn-primary rounded-pill px-4 mx-auto">
            <i className="fas fa-compass me-2"></i>Explore Pitches
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((item) => {
            const pitch = item.pitchId || {};
            const isApproved = item.status?.toLowerCase() === "approved";
            const isPaid = item.status?.toLowerCase() === "paid";

            return (
              <div className="col-12" key={item._id}>
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white wow bounceInUp">
                  <div className="row align-items-center g-4">
                    {/* Pitch Media / Thumbnail */}
                    <div className="col-md-3 text-center">
                      {pitch.pitchVideoUrl ? (
                        <img
                          src={pitch.pitchVideoUrl}
                          alt={pitch.title}
                          className="rounded-4 w-100 object-fit-cover shadow-sm"
                          style={{ height: "140px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="rounded-4 bg-light d-flex align-items-center justify-content-center w-100"
                          style={{ height: "140px" }}
                        >
                          <i className="fas fa-lightbulb fa-3x text-muted"></i>
                        </div>
                      )}
                    </div>

                    {/* Pitch & Terms Info */}
                    <div className="col-md-5">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        {pitch.category?.categoryName && (
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill">
                            {pitch.category.categoryName}
                          </span>
                        )}
                        <span className="text-muted small">
                          <i className="fas fa-calendar-alt me-1"></i>
                          {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                        </span>
                      </div>

                      <h4 className="fw-bold mb-2 text-dark">
                        {pitch.title || "Untitled Pitch"}
                      </h4>

                      <div className="row g-2 text-muted small mt-1">
                        <div className="col-6">
                          <i className="fas fa-wallet text-primary me-2"></i>
                          <strong>Offered:</strong> ₹{Number(item.amount).toLocaleString()}
                        </div>
                        <div className="col-6">
                          <i className="fas fa-chart-pie text-info me-2"></i>
                          <strong>Equity:</strong> {item.equityPercent}%
                        </div>
                        {pitch.ownerId && (
                          <div className="col-12">
                            <i className="fas fa-user text-secondary me-2"></i>
                            <strong>Founder:</strong> {pitch.ownerId.name} ({pitch.ownerId.email})
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="col-md-4 text-md-end">
                      <div className="mb-3">{getStatusBadge(item.status)}</div>

                      {/* Pay with Razorpay Button */}
                      {isApproved && (
                        <div className="mt-2">
                          <button
                            onClick={() => handleRazorpayPayment(item)}
                            className="btn btn-success btn-lg rounded-pill px-4 py-2 fw-bold shadow-sm w-100"
                          >
                            <i className="fas fa-credit-card me-2"></i>
                            Pay ₹{Number(item.amount).toLocaleString()} with Razorpay
                          </button>
                          <div className="small text-muted mt-1 text-center">
                            <i className="fas fa-lock text-success me-1"></i>Founder approved your offer
                          </div>
                        </div>
                      )}

                      {/* View Receipt Button */}
                      {isPaid && (
                        <button
                          onClick={() => setSelectedReceipt(item)}
                          className="btn btn-outline-dark rounded-pill px-4 btn-sm"
                        >
                          <i className="fas fa-receipt me-1"></i>View Payment Receipt
                        </button>
                      )}

                      {/* Pitch Details Link */}
                      <div className="mt-2">
                        <Link
                          to={`/investor/pitchDetail/${pitch._id}`}
                          className="text-primary small text-decoration-none"
                        >
                          View Pitch Details <i className="fas fa-arrow-right ms-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Receipt Modal */}
      {selectedReceipt && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header bg-success text-white rounded-top-4">
                <h5 className="modal-title fw-bold">
                  <i className="fas fa-check-circle me-2"></i>
                  Investment Receipt
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedReceipt(null)}
                ></button>
              </div>
              <div className="modal-body p-4 text-center">
                <div
                  className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "65px", height: "65px" }}
                >
                  <i className="fas fa-check fa-2x"></i>
                </div>
                <h4 className="fw-bold text-dark mb-1">Payment Successful</h4>
                <p className="text-muted small mb-4">
                  Transaction verified and deposited into IdeaFund Escrow
                </p>

                <div className="list-group list-group-flush rounded-3 text-start mb-3">
                  <div className="list-group-item d-flex justify-content-between py-2">
                    <span className="text-muted">Idea Pitch</span>
                    <strong className="text-end">{selectedReceipt.pitchId?.title}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between py-2">
                    <span className="text-muted">Invested Amount</span>
                    <strong className="text-success">₹{Number(selectedReceipt.amount).toLocaleString()}</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between py-2">
                    <span className="text-muted">Equity Allocated</span>
                    <strong>{selectedReceipt.equityPercent}%</strong>
                  </div>
                  <div className="list-group-item d-flex justify-content-between py-2">
                    <span className="text-muted">Razorpay Payment ID</span>
                    <code className="text-primary">{selectedReceipt.paymentId || "rzp_simulated"}</code>
                  </div>
                  <div className="list-group-item d-flex justify-content-between py-2">
                    <span className="text-muted">Date</span>
                    <span>
                      {selectedReceipt.paymentDate
                        ? new Date(selectedReceipt.paymentDate).toLocaleString()
                        : new Date().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-4 w-100"
                  onClick={() => setSelectedReceipt(null)}
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInvestments;
