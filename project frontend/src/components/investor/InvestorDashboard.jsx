import React from "react";
import { Link } from "react-router-dom";

const InvestorDashboard = () => {
  return (
    <div className="container py-5">

      {/* Dashboard Heading */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">
          Investor Dashboard
        </h1>

        <p className="text-muted mx-auto" style={{ maxWidth: "650px" }}>
          Track your investments, discover promising ideas, and explore new
          funding opportunities through IdeaFund.
        </p>
      </div>

      {/* Main Dashboard Cards */}
      <div className="row g-4 justify-content-center mb-5 mt-2">

        {/* Explore Opportunities */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 border-0 shadow-sm text-center p-4">

            <div className="mb-4">
              <i className="fas fa-lightbulb fa-4x"></i>
            </div>

            <h4 className="mb-3">
              Explore Opportunities
            </h4>

            <p className="text-muted">
              Browse innovative pitches submitted by entrepreneurs and discover
              projects that match your investment interests.
            </p>

            <Link
              to="/investor/viewPitch"
              className="btn btn-primary mt-auto"
            >
              Explore Pitches
            </Link>

          </div>
        </div>

        {/* My Investments */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 border-0 shadow-sm text-center p-4">

            <div className="mb-4">
              <i className="fas fa-wallet fa-4x"></i>
            </div>

            <h4 className="mb-3">
              My Investments
            </h4>

            <p className="text-muted">
              View the projects you have supported and manage your investment
              activity in one place.
            </p>

            <Link
              to="/investor/manageInvestments"
              className="btn btn-primary mt-auto"
            >
              View Investments
            </Link>

          </div>
        </div>

        {/* Start Investing */}
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 border-0 shadow-sm text-center p-4">

            <div className="mb-4">
              <i className="fas fa-coins fa-4x"></i>
            </div>

            <h4 className="mb-3">
              Start Investing
            </h4>

            <p className="text-muted">
              Discover promising ideas and support projects that have the
              potential to grow and succeed.
            </p>

            <Link
              to="/investor/viewPitch"
              className="btn btn-primary mt-auto"
            >
              Invest Now
            </Link>

          </div>
        </div>

      </div>

      {/* How It Works Section */}
      <div className="text-center py-5">
        <h1 className=" mb-3">
          How IdeaFund Works
        </h1>

        <p className="text-muted mb-5">
          A simple way to discover, evaluate, and support innovative ideas.
        </p>

        <div className="row g-4 justify-content-center mt-2">

          <div className="col-md-4">
            <div className="p-4 h-100">
              <i className="fas fa-search fa-3x mb-3"></i>

              <h4>Discover Ideas</h4>

              <p className="text-muted">
                Explore pitches from entrepreneurs across different categories.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100">
              <i className="fas fa-file-alt fa-3x mb-3"></i>

              <h4>Review Pitches</h4>

              <p className="text-muted">
                Review project details and funding requirements before investing.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 h-100">
              <i className="fas fa-coins fa-3x mb-3"></i>

              <h4>Support Growth</h4>

              <p className="text-muted">
                Invest in promising projects and become part of their journey.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Call To Action */}
      <div className="text-center py-5 mb-4">
        <h1>
          Find Your Next Opportunity
        </h1>

        <p className="text-muted mb-4">
          Explore innovative ideas and discover projects worth supporting.
        </p>

        <Link
          to="/investor/viewPitch"
          className="btn btn-primary px-4 py-2"
        >
          Browse All Pitches
        </Link>
      </div>

    </div>
  );
};

export default InvestorDashboard;