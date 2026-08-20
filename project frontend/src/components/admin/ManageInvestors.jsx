import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Apiservices from "../../../Apiservices";

const ManageInvestors = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [kycFilter, setKycFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [investorToDelete, setInvestorToDelete] = useState(null);

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = () => {
    setLoading(true);
    Apiservices.ManageInvestors({})
      .then((res) => {
        if (res.data && res.data.success) {
          setInvestors(res.data.data || []);
        } else {
          toast.error(res.data?.message || "Failed to load investors");
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

  const toggleInvestorStatus = (profileId, currentStatus) => {
    Apiservices.SoftDeleteInvestor({ _id: profileId })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success(res.data.message || "Status updated");
          setInvestors((prev) =>
            prev.map((item) => {
              if (item._id === profileId && item.userId) {
                return {
                  ...item,
                  userId: {
                    ...item.userId,
                    status: !currentStatus,
                  },
                };
              }
              return item;
            })
          );
        } else {
          toast.warning(res.data?.message || "Failed to change status");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating investor status");
      });
  };

  const handleKycChange = (profileId, newKyc) => {
    Apiservices.UpdateInvestorKyc({ _id: profileId, kycStatus: newKyc })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success(`KYC status updated to ${newKyc}!`);
          setInvestors((prev) =>
            prev.map((item) =>
              item._id === profileId ? { ...item, kycStatus: newKyc } : item
            )
          );
          if (selectedInvestor && selectedInvestor._id === profileId) {
            setSelectedInvestor((prev) => ({ ...prev, kycStatus: newKyc }));
          }
        } else {
          toast.warning(res.data?.message || "Failed to update KYC status");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error updating KYC status");
      });
  };

  const confirmDelete = () => {
    if (!investorToDelete) return;
    Apiservices.DeleteInvestor({ _id: investorToDelete._id })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("Investor deleted successfully!");
          setInvestorToDelete(null);
          fetchInvestors();
        } else {
          toast.warning(res.data?.message || "Failed to delete investor");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error deleting investor");
      });
  };

  // Filtered investors
  const filteredInvestors = investors.filter((profile) => {
    const user = profile.userId || {};
    const name = user.name || "";
    const email = user.email || "";
    const country = profile.country || "";
    const kyc = profile.kycStatus || "Pending";
    const risk = profile.riskPreference || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      risk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kyc.toLowerCase().includes(searchTerm.toLowerCase());

    const isUserActive = user.status !== false;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && isUserActive) ||
      (statusFilter === "inactive" && !isUserActive);

    const matchesKyc =
      kycFilter === "all" ||
      kyc.toLowerCase() === kycFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesKyc;
  });

  const totalInvestors = investors.length;
  const approvedKyc = investors.filter(
    (i) => i.kycStatus?.toLowerCase() === "approved"
  ).length;
  const pendingKyc = investors.filter(
    (i) =>
      !i.kycStatus ||
      i.kycStatus.toLowerCase() === "pending"
  ).length;

  const getKycBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "pending":
      default:
        return "bg-warning text-dark";
    }
  };

  const getRiskBadgeClass = (risk) => {
    switch (risk?.toLowerCase()) {
      case "high":
        return "bg-danger text-white";
      case "medium":
        return "bg-primary text-white";
      case "low":
        return "bg-info text-dark";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5 animated bounceInDown">
        <h1 className="display-5 mb-2">Manage Investors</h1>
        <p className="text-muted mb-0">
          Review, verify KYC credentials, manage accounts, and monitor all platform investors.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ width: "48px", height: "48px" }}
              >
                <i className="fas fa-hand-holding-usd fa-lg"></i>
              </div>
              <div className="text-start">
                <h3 className="fw-bold mb-0 text-dark">{totalInvestors}</h3>
                <span className="text-muted small">Total Investors</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <div
                className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ width: "48px", height: "48px" }}
              >
                <i className="fas fa-check-double fa-lg"></i>
              </div>
              <div className="text-start">
                <h3 className="fw-bold mb-0 text-success">{approvedKyc}</h3>
                <span className="text-muted small">Verified KYC</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <div
                className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ width: "48px", height: "48px" }}
              >
                <i className="fas fa-clock fa-lg"></i>
              </div>
              <div className="text-start">
                <h3 className="fw-bold mb-0 text-warning">{pendingKyc}</h3>
                <span className="text-muted small">Pending KYC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search by investor name, email, country, risk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="btn btn-light border-0"
                  type="button"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select bg-light border-0"
              value={kycFilter}
              onChange={(e) => setKycFilter(e.target.value)}
            >
              <option value="all">All KYC Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              className="form-select bg-light border-0"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          <div className="col-md-2 text-md-end">
            <button
              className="btn btn-outline-primary w-100"
              onClick={fetchInvestors}
              title="Refresh investors"
            >
              <i className="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Investors Content List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading investors...</p>
        </div>
      ) : filteredInvestors.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <i className="fas fa-user-tie fa-3x text-muted mb-3"></i>
          <h4>No Investors Found</h4>
          <p className="text-muted">
            {searchTerm
              ? `No investor records matching "${searchTerm}"`
              : "No investor accounts registered in the system yet."}
          </p>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12">
            {filteredInvestors.map((item, index) => {
              const u = item.userId || {};
              const isActive = u.status !== false;

              return (
                <div
                  className="card border-0 shadow-sm mb-3 rounded-4 wow bounceInUp"
                  key={item._id}
                >
                  <div className="card-body p-4">
                    <div className="row align-items-center g-3">
                      {/* S.No */}
                      <div className="col-12 col-md-1 text-center">
                        <div className="fs-5 fw-bold text-muted">
                          {index + 1}
                        </div>
                      </div>

                      {/* Investor Avatar & Basic Info */}
                      <div className="col-12 col-md-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4 me-3"
                            style={{
                              width: "55px",
                              height: "55px",
                              minWidth: "55px",
                              backgroundColor: "#e8f0fe",
                            }}
                          >
                            {(u.name && u.name.charAt(0).toUpperCase()) || "I"}
                          </div>
                          <div>
                            <h5 className="mb-1 text-dark fw-bold">
                              {u.name || "Unknown Investor"}
                            </h5>
                            <p className="text-muted small mb-1">
                              <i className="fas fa-envelope me-1 text-primary"></i>
                              {u.email || "No email"}
                            </p>
                            <div className="d-flex gap-2 align-items-center">
                              <span className="badge bg-light text-dark border">
                                <i className="fas fa-globe me-1 text-primary"></i>
                                {item.country || "Global"}
                              </span>
                              {item.riskPreference && (
                                <span
                                  className={`badge ${getRiskBadgeClass(
                                    item.riskPreference
                                  )}`}
                                >
                                  {item.riskPreference} Risk
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* KYC Status & Updater */}
                      <div className="col-12 col-md-3">
                        <div className="p-2 rounded-3 bg-light">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="small text-muted fw-semibold">
                              KYC Verification:
                            </span>
                            <span
                              className={`badge ${getKycBadgeClass(
                                item.kycStatus
                              )}`}
                            >
                              {item.kycStatus || "Pending"}
                            </span>
                          </div>
                          <select
                            className="form-select form-select-sm border-0 bg-white shadow-sm mt-1"
                            value={item.kycStatus || "Pending"}
                            onChange={(e) =>
                              handleKycChange(item._id, e.target.value)
                            }
                          >
                            <option value="Pending">Set: Pending</option>
                            <option value="Approved">Set: Approved</option>
                            <option value="Rejected">Set: Rejected</option>
                          </select>
                        </div>
                      </div>

                      {/* Account Status Switch */}
                      <div className="col-6 col-md-2 text-center">
                        <span
                          className={`badge mb-2 ${
                            isActive ? "bg-success" : "bg-secondary"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                        <div className="form-check form-switch d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            style={{ cursor: "pointer", transform: "scale(1.2)" }}
                            checked={isActive}
                            onChange={() =>
                              toggleInvestorStatus(item._id, isActive)
                            }
                            title={
                              isActive
                                ? "Deactivate Investor"
                                : "Activate Investor"
                            }
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-6 col-md-2">
                        <div className="d-flex flex-column gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm rounded-pill w-100"
                            onClick={() => setSelectedInvestor(item)}
                          >
                            <i className="fas fa-eye me-1"></i> View Profile
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill w-100"
                            onClick={() => setInvestorToDelete(item)}
                          >
                            <i className="fas fa-trash me-1"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Investor Profile Details Modal */}
      {selectedInvestor && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header bg-primary text-white rounded-top-4">
                <h5 className="modal-title fw-bold">
                  <i className="fas fa-user-tie me-2"></i>
                  Investor Profile Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedInvestor(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="text-center mb-4">
                  <div
                    className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold fs-2 mb-2"
                    style={{ width: "70px", height: "70px" }}
                  >
                    {selectedInvestor.userId?.name?.charAt(0).toUpperCase() || "I"}
                  </div>
                  <h4 className="fw-bold mb-0">{selectedInvestor.userId?.name}</h4>
                  <p className="text-muted small">{selectedInvestor.userId?.email}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <span
                      className={`badge ${
                        selectedInvestor.userId?.status !== false
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {selectedInvestor.userId?.status !== false
                        ? "Active Investor"
                        : "Inactive Investor"}
                    </span>
                    <span
                      className={`badge ${getKycBadgeClass(
                        selectedInvestor.kycStatus
                      )}`}
                    >
                      KYC: {selectedInvestor.kycStatus || "Pending"}
                    </span>
                  </div>
                </div>

                <div className="list-group list-group-flush rounded-3">
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-shield-alt me-2 text-primary"></i>Risk Preference
                    </span>
                    <span
                      className={`badge ${getRiskBadgeClass(
                        selectedInvestor.riskPreference
                      )}`}
                    >
                      {selectedInvestor.riskPreference || "Not specified"}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-globe me-2 text-primary"></i>Country
                    </span>
                    <span className="fw-semibold">
                      {selectedInvestor.country || "N/A"}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-file-signature me-2 text-primary"></i>KYC Status
                    </span>
                    <span className="fw-semibold">
                      {selectedInvestor.kycStatus || "Pending"}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-calendar-alt me-2 text-primary"></i>Registered Date
                    </span>
                    <span className="fw-semibold">
                      {selectedInvestor.created_at
                        ? new Date(selectedInvestor.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-light rounded-3">
                  <label className="form-label small fw-bold text-muted mb-2">
                    Update KYC Verification:
                  </label>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success flex-fill"
                      onClick={() =>
                        handleKycChange(selectedInvestor._id, "Approved")
                      }
                    >
                      <i className="fas fa-check me-1"></i>Approve
                    </button>
                    <button
                      className="btn btn-sm btn-warning flex-fill"
                      onClick={() =>
                        handleKycChange(selectedInvestor._id, "Pending")
                      }
                    >
                      <i className="fas fa-clock me-1"></i>Pending
                    </button>
                    <button
                      className="btn btn-sm btn-danger flex-fill"
                      onClick={() =>
                        handleKycChange(selectedInvestor._id, "Rejected")
                      }
                    >
                      <i className="fas fa-times me-1"></i>Reject
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={() => setSelectedInvestor(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {investorToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-body p-4 text-center">
                <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h4 className="fw-bold mb-2">Delete Investor Account</h4>
                <p className="text-muted mb-4">
                  Are you sure you want to permanently delete{" "}
                  <strong>{investorToDelete.userId?.name || "this investor"}</strong>?
                  This action cannot be undone.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setInvestorToDelete(null)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger rounded-pill px-4"
                    onClick={confirmDelete}
                  >
                    <i className="fas fa-trash me-2"></i>Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInvestors;
