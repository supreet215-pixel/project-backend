import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Temporary data
  // Later you can replace these values with your API data
  const stats = [
    {
      title: "Total Categories",
      value: "12",
      icon: "fas fa-layer-group",
    },
    {
      title: "Active Categories",
      value: "10",
      icon: "fas fa-check-circle",
    },
    {
      title: "Total Ideas",
      value: "1200+",
      icon: "fas fa-lightbulb",
    },
    {
      title: "Active Users",
      value: "15000+",
      icon: "fas fa-users",
    },
  ];

  // Temporary recent categories
  const recentCategories = [
    {
      name: "Medical",
      description:
        "Support innovative healthcare ideas, medical research, and life-changing solutions.",
      image: "/img/medical.jpg",
      status: true,
    },
    {
      name: "IT Sector",
      description:
        "Discover innovative technology, software, and digital solutions with strong potential.",
      image: "/img/it.jpg",
      status: true,
    },
    {
      name: "Fashion",
      description:
        "Support creative fashion brands, sustainable designs, and unique collections.",
      image: "/img/fashion.jpg",
      status: true,
    },
    {
      name: "Automobile",
      description:
        "Explore innovative vehicles, mobility solutions, and automotive business ideas.",
      image: "/img/car.jpg",
      status: false,
    },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container">
        {/* Dashboard Heading */}
        <div className="row align-items-center mb-5">
          <div className="col-md-8 animated bounceInDown">
            <h1 className="fw mb-2">Admin Dashboard</h1>

            <p className="text-muted mb-0">
              Manage your crowdfunding platform, categories, and projects from
              one place.
            </p>
          </div>

          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button
              className="btn btn-primary px-4 py-2 me-2"
              onClick={() => navigate("/admin/addCategory")}
            >
              <i className="fas fa-plus me-2"></i>
              Add Category
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="row g-4 mb-5">
          {stats.map((item, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card border-0 shadow-sm h-100 rounded-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-2">{item.title}</p>

                      <h2 className="fw mb-0">{item.value}</h2>
                    </div>

                    <div
                      className="bg-primary rounded-circle d-flex justify-content-center align-items-center"
                      style={{
                        width: "65px",
                        height: "65px",
                      }}
                    >
                      <i className={`${item.icon} fa-2x text-white`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {/* Quick Actions */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h3 className="fw mb-4">Quick Actions</h3>

                {/* Add Category */}
                <button
                  className="btn btn-primary w-100 text-start p-3 mb-3"
                  onClick={() => navigate("/admin/addCategory")}
                >
                  <i className="fas fa-folder-plus me-3"></i>
                  Add New Category
                  <i className="fas fa-arrow-right float-end mt-1"></i>
                </button>

                {/* Manage Categories */}
                <button
                  className="btn btn-outline-dark w-100 text-start p-3 mb-3"
                  onClick={() => navigate("/admin/manageCategory")}
                >
                  <i className="fas fa-list me-3"></i>
                  Manage Categories
                  <i className="fas fa-arrow-right float-end mt-1"></i>
                </button>

                {/* Manage Ideas */}
                <button className="btn btn-outline-dark w-100 text-start p-3 mb-3">
                  <i className="fas fa-lightbulb me-3"></i>
                  Manage Ideas
                  <i className="fas fa-arrow-right float-end mt-1"></i>
                </button>

                {/* Manage Users */}
                <button
                  className="btn btn-outline-dark w-100 text-start p-3 mb-3"
                  onClick={() => navigate("/admin/manageUsers")}
                >
                  <i className="fas fa-users me-3"></i>
                  Manage Users
                  <i className="fas fa-arrow-right float-end mt-1"></i>
                </button>

                {/* Manage Investors */}
                <button
                  className="btn btn-outline-dark w-100 text-start p-3"
                  onClick={() => navigate("/admin/manageInvestors")}
                >
                  <i className="fas fa-hand-holding-usd me-3"></i>
                  Manage Investors
                  <i className="fas fa-arrow-right float-end mt-1"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Categories */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                {/* Heading */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h3 className="fw mb-1">Recent Categories</h3>

                    <p className="text-muted mb-0">
                      Recently added categories on your platform.
                    </p>
                  </div>

                  <button
                    className="btn btn-outline-dark"
                    onClick={() => navigate("/admin/manageCategory")}
                  >
                    View All
                  </button>
                </div>

                {/* Categories */}
                <div className="row g-3">
                  {recentCategories.map((category, index) => (
                    <div className="col-md-6" key={index}>
                      <div className="border rounded-4 p-3 h-100">
                        <div className="d-flex align-items-center">
                          {/* Image */}
                          <img
                            src={category.image}
                            alt={category.name}
                            className="rounded-3 me-3"
                            style={{
                              width: "70px",
                              height: "70px",
                              objectFit: "cover",
                            }}
                          />

                          {/* Content */}
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start">
                              <h5 className="fw mb-1">{category.name}</h5>

                              <span
                                className={`badge ${
                                  category.status
                                    ? "bg-success"
                                    : "bg-secondary"
                                }`}
                              >
                                {category.status ? "Active" : "Inactive"}
                              </span>
                            </div>

                            <p
                              className="text-muted small mb-0"
                              style={{
                                lineHeight: "1.5",
                              }}
                            >
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="row g-4 mt-2">
          {/* Platform Summary */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h3 className="fw mb-3">Platform Overview</h3>

                <p className="text-muted">
                  Monitor the growth of your IdeaFund platform, manage
                  categories, review submitted ideas, and keep track of investor
                  and entrepreneur activity.
                </p>

                <div className="row text-center mt-4">
                  <div className="col-4 border-end">
                    <h4 className="fw">1200+</h4>

                    <p className="text-muted mb-0">Ideas</p>
                  </div>

                  <div className="col-4 border-end">
                    <h4 className="fw">15K+</h4>

                    <p className="text-muted mb-0">Supporters</p>
                  </div>

                  <div className="col-4">
                    <h4 className="fw">50L+</h4>

                    <p className="text-muted mb-0">Funds Raised</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Information */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4 d-flex align-items-center">
                <div
                  className="bg-primary rounded-circle d-flex justify-content-center align-items-center me-4"
                  style={{
                    width: "70px",
                    height: "70px",
                    minWidth: "70px",
                  }}
                >
                  <i className="fas fa-user-shield fa-2x text-white"></i>
                </div>

                <div>
                  <h4 className="fw mb-1">Administrator Panel</h4>

                  <p className="text-muted mb-0">
                    You have full access to manage categories, ideas, users, and
                    platform activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
