function About() {
  return (
    <>
      {/* Hero Start */}
      <div className="container-fluid bg-light py-4 my-4 mt-4">
        <div className="container text-center animated bounceInDown">
          <h1 className="display-1 mb-4">About Us</h1>
          <ol className="breadcrumb justify-content-center mb-0 animated bounceInDown">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item text-dark" aria-current="page">
              About
            </li>
          </ol>
        </div>
      </div>
      {/* Hero End */}
      {/* About Satrt */}
      <div className="container-fluid py-6">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.1s">
              <img src="img/about.png" className="img-fluid rounded" alt="" />
            </div>
            <div className="col-lg-6 wow bounceInUp" data-wow-delay="0.3s">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                About Us
              </small>
              <h1 className="display-5 mb-4">
                Where Great Ideas Find the Support to Become Reality
              </h1>
              <p className="mb-4">
                IdeaFund is a crowdfunding platform designed to help passionate
                creators turn their ideas into reality. Whether you're launching
                a startup, building an innovative project, or creating something
                meaningful, connect with supporters who believe in your vision.
              </p>
              <div className="row g-4 text-dark mb-5">
                <div className="col-sm-6">
                  <i className=" text-primary me-2" />
                  💡 Turn Ideas into Reality
                </div>
                <div className="col-sm-6">
                  <i className=" text-primary me-2" />
                  🤝 Connect with Supporters
                </div>
                <div className="col-sm-6">
                  <i className="text-primary me-2" />
                  🚀 Fund Projects That Matter
                </div>
                <div className="col-sm-6">
                  <i className="text-primary me-2" />
                  🌱 Grow, Create & Make an Impact
                </div>
              </div>
              <a href="" className="btn btn-primary py-2 px-4 rounded-pill">
                About Us
                <i className="fas fa-arrow-right ps-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}
      {/* Working Features */}
      <div className="container-fluid py-5 my-5 mb-0 pb-0 min-vh-100">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-5">
            <h1 className="mb-2">How Idea Fund Works</h1>
            <p className="fs-5 text-secondary mb-0">
              Connecting innovative ideas with smart investors
            </p>
          </div>

          {/* Cards */}
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="bg-primary rounded-3 text-center h-100 px-4 py-4 shadow-sm">
                <div className="mb-3">
                  <i className="fas fa-lightbulb fa-8x text-white"></i>
                </div>

                <h2 className="fw-semibold mb-2">Owner Adds Idea</h2>

                <p className="fs-7 text-dark mb-3">
                  Entrepreneurs submit their innovative ideas with pitch videos
                  and details.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="bg-primary rounded-3 text-center h-100 px-4 py-4 shadow-sm">
                <div className="mb-3">
                  <i className="fas fa-search-dollar fa-8x text-white"></i>
                </div>

                <h2 className="fw-semibold mb-2">Investors Explore</h2>

                <p className="fs-7 text-dark mb-3">
                  Investors browse verified ideas and evaluate opportunities.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="bg-primary rounded-3 text-center h-100 px-4 py-4 shadow-sm">
                <div className="mb-3">
                  <i className="fas fa-money-bill-wave fa-8x text-white"></i>
                </div>

                <h2 className="fw-semibold mb-2">Investment Happens</h2>

                <p className="fs-7 text-dark mb-3">
                  Investors fund promising ideas and help bring them to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Working Features */}

      {/* Fact Start */}
      <div className="container-fluid faqt py-6">
          <div className="container">
            <div className="row g-4 align-items-center">
              {/* Statistics Section */}
              <div className="col-lg-6">
                <div className="row g-4">
                  {/* Large Top Card */}
                  <div className="col-12 wow bounceInUp" data-wow-delay="0.3s">
                    <div className="faqt-item bg-primary rounded p-3 text-center">
                      <i className="fas fa-lightbulb fa-3x mb-3 text-white" />

                      <h1
                        className="display-5 fw-bold"
                        data-toggle="counter-up"
                      >
                        1200+
                      </h1>

                      <p className="text-dark text-uppercase fw-bold mb-0">
                        Ideas Funded
                      </p>
                    </div>
                  </div>

                  {/* Bottom Left Card */}
                  <div
                    className="col-sm-6 wow bounceInUp"
                    data-wow-delay="0.5s"
                  >
                    <div className="faqt-item bg-primary rounded p-3 text-center">
                      <i className="fas fa-users fa-3x mb-3 text-white" />

                      <h1
                        className="display-5 fw-bold"
                        data-toggle="counter-up"
                      >
                        15000+
                      </h1>

                      <p className="text-dark text-uppercase fw-bold mb-0">
                        Active Supporters
                      </p>
                    </div>
                  </div>

                  {/* Bottom Right Card */}
                  <div
                    className="col-sm-6 wow bounceInUp"
                    data-wow-delay="0.7s"
                  >
                    <div className="faqt-item bg-primary rounded p-3 text-center">
                      <i className="fas fa-check fa-3x mb-3 text-white" />

                      <h1
                        className="display-5 fw-bold"
                        data-toggle="counter-up"
                      >
                        50L+
                      </h1>

                      <p className="text-dark text-uppercase fw-bold mb-0">
                        Funds Raised
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div
                className="col-lg-6 wow bounceInUp d-flex justify-content-center align-items-center"
                data-wow-delay="0.1s"
              >
                <img
                  src="img/fact.png"
                  className="img-fluid rounded w-100"
                  alt="Funding Growth Graph"
                />
              </div>
            </div>
          </div>
        </div>
      {/* Fact End */}
    </>
  );
}

export default About;
