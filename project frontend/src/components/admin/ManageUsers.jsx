import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Apiservices from "../../../Apiservices";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    Apiservices.ManageUsers({})
      .then((res) => {
        if (res.data && res.data.success) {
          setUsers(res.data.data || []);
        } else {
          toast.error(res.data?.message || "Failed to load users");
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

  const toggleUserStatus = (profileId, currentStatus) => {
    Apiservices.SoftDeleteUser({ _id: profileId })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success(res.data.message || "Status updated");
          // Optimistically update local state
          setUsers((prev) =>
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
        toast.error("Error updating user status");
      });
  };

  const confirmDelete = () => {
    if (!userToDelete) return;
    Apiservices.DeleteUser({ _id: userToDelete._id })
      .then((res) => {
        if (res.data && res.data.success) {
          toast.success("User deleted successfully!");
          setUserToDelete(null);
          fetchUsers();
        } else {
          toast.warning(res.data?.message || "Failed to delete user");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error deleting user");
      });
  };

  // Filtered users based on search and status
  const filteredUsers = users.filter((profile) => {
    const user = profile.userId || {};
    const name = user.name || "";
    const email = user.email || "";
    const country = profile.country || "";
    const occupation = profile.occupation || "";
    const contact = profile.contact || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      occupation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.toLowerCase().includes(searchTerm.toLowerCase());

    const isUserActive = user.status !== false;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && isUserActive) ||
      (statusFilter === "inactive" && !isUserActive);

    return matchesSearch && matchesStatus;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.userId?.status !== false).length;
  const inactiveUsers = totalUsers - activeUsers;

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5 animated bounceInDown">
        <h1 className="display-5 mb-2">Manage Users</h1>
        <p className="text-muted mb-0">
          View, monitor, activate, deactivate, and manage all registered platform users.
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
                <i className="fas fa-users fa-lg"></i>
              </div>
              <div className="text-start">
                <h3 className="fw-bold mb-0 text-dark">{totalUsers}</h3>
                <span className="text-muted small">Total Users</span>
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
                <i className="fas fa-user-check fa-lg"></i>
              </div>
              <div className="text-start">
                <h3 className="fw-bold mb-0 text-success">{activeUsers}</h3>
                <span className="text-muted small">Active Accounts</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm rounded-4 text-center p-3 h-100 bg-white">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <div
                className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ width: "48px", height: "48px" }}
              >
                <i className="fas fa-user-slash fa-lg"></i>
              </div>
              <div className="text-start">
                <h3 className="fw-bold mb-0 text-secondary">{inactiveUsers}</h3>
                <span className="text-muted small">Inactive Accounts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card border-0 shadow-sm rounded-4 mb-4 p-3 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-7">
            <div className="input-group">
              <span className="input-group-text bg-light border-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-0"
                placeholder="Search by name, email, country, occupation..."
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
              onClick={fetchUsers}
              title="Refresh users"
            >
              <i className="fas fa-sync-alt me-2"></i>Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Users Content List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
          <i className="fas fa-user-friends fa-3x text-muted mb-3"></i>
          <h4>No Users Found</h4>
          <p className="text-muted">
            {searchTerm
              ? `No user records matching "${searchTerm}"`
              : "No user accounts registered in the system yet."}
          </p>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12">
            {filteredUsers.map((item, index) => {
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

                      {/* User Avatar & Name */}
                      <div className="col-12 col-md-4">
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4 me-3"
                            style={{
                              width: "55px",
                              height: "55px",
                              minWidth: "55px",
                            }}
                          >
                            {(u.name && u.name.charAt(0).toUpperCase()) || "U"}
                          </div>
                          <div>
                            <h5 className="mb-1 text-dark fw-bold">
                              {u.name || "Unknown User"}
                            </h5>
                            <p className="text-muted small mb-0">
                              <i className="fas fa-envelope me-1 text-primary"></i>
                              {u.email || "No email"}
                            </p>
                            {item.occupation && (
                              <span className="badge bg-light text-dark mt-1 border">
                                <i className="fas fa-briefcase me-1 text-secondary"></i>
                                {item.occupation}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Location & Contact */}
                      <div className="col-12 col-md-3">
                        <div className="text-muted small">
                          <div className="mb-1">
                            <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                            <strong>{item.country || "Not specified"}</strong>
                          </div>
                          {item.contact && (
                            <div className="mb-1">
                              <i className="fas fa-phone me-2 text-success"></i>
                              {item.contact}
                            </div>
                          )}
                          {item.address && (
                            <div
                              className="text-truncate"
                              style={{ maxWidth: "200px" }}
                              title={item.address}
                            >
                              <i className="fas fa-home me-2 text-info"></i>
                              {item.address}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Toggle Switch */}
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
                            onChange={() => toggleUserStatus(item._id, isActive)}
                            title={isActive ? "Deactivate User" : "Activate User"}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-6 col-md-2">
                        <div className="d-flex flex-column gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm rounded-pill w-100"
                            onClick={() => setSelectedUser(item)}
                          >
                            <i className="fas fa-eye me-1"></i> View Details
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill w-100"
                            onClick={() => setUserToDelete(item)}
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

      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header bg-primary text-white rounded-top-4">
                <h5 className="modal-title fw-bold">
                  <i className="fas fa-user-circle me-2"></i>
                  User Profile Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setSelectedUser(null)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="text-center mb-4">
                  <div
                    className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fw-bold fs-2 mb-2"
                    style={{ width: "70px", height: "70px" }}
                  >
                    {selectedUser.userId?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <h4 className="fw-bold mb-0">{selectedUser.userId?.name}</h4>
                  <p className="text-muted small">{selectedUser.userId?.email}</p>
                  <span
                    className={`badge ${
                      selectedUser.userId?.status !== false
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {selectedUser.userId?.status !== false ? "Active User" : "Inactive User"}
                  </span>
                </div>

                <div className="list-group list-group-flush rounded-3">
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-briefcase me-2 text-primary"></i>Occupation
                    </span>
                    <span className="fw-semibold">
                      {selectedUser.occupation || "N/A"}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-globe me-2 text-primary"></i>Country
                    </span>
                    <span className="fw-semibold">
                      {selectedUser.country || "N/A"}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-phone me-2 text-primary"></i>Contact
                    </span>
                    <span className="fw-semibold">
                      {selectedUser.contact || "N/A"}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-map-marker-alt me-2 text-primary"></i>Address
                    </span>
                    <span className="fw-semibold text-end" style={{ maxWidth: "60%" }}>
                      {selectedUser.address || "N/A"}
                    </span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center px-0 py-2">
                    <span className="text-muted">
                      <i className="fas fa-calendar-alt me-2 text-primary"></i>Joined Date
                    </span>
                    <span className="fw-semibold">
                      {selectedUser.created_at
                        ? new Date(selectedUser.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light rounded-bottom-4">
                <button
                  type="button"
                  className="btn btn-secondary rounded-pill px-4"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-body p-4 text-center">
                <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                <h4 className="fw-bold mb-2">Delete User Account</h4>
                <p className="text-muted mb-4">
                  Are you sure you want to permanently delete{" "}
                  <strong>{userToDelete.userId?.name || "this user"}</strong>?
                  This action cannot be undone.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    className="btn btn-secondary rounded-pill px-4"
                    onClick={() => setUserToDelete(null)}
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

export default ManageUsers;
