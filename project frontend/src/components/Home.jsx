function Home() {
  return (
    <>
      <>
        {/* Modal Search Start */}
        <div
          className="modal fade"
          id="searchModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Search by keyword
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input
                    type="search"
                    className="form-control bg-transparent p-3"
                    placeholder="keywords"
                    aria-describedby="search-icon-1"
                  />
                  <span id="search-icon-1" className="input-group-text p-3">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Search End */}
        {/* Hero Start */}
        <div className="container-fluid bg-light py-4 my-6 mt-0">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 col-md-12">
                <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-4 animated bounceInDown">
                  Welcome to IdeaFund
                </small>
                <h1 className="display-1 mb-4 animated bounceInDown">
                  Where <span className="text-primary">Ideas</span> Meet
                  Investment
                </h1>
                <a
                  href=""
                  className="btn btn-primary border-0 rounded-pill py-3 px-4 px-md-5 me-4 animated bounceInLeft"
                >
                  Ideas
                </a>
              </div>
              <div className="col-lg-6 col-md-12">
                <img
                  src="img/hero.png"
                  className="img-fluid rounded animated zoomIn"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* Hero End */}
        {/* About Start */}
        <div className="container-fluid py-3">
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
                  IdeaFund is a crowdfunding platform designed to help
                  passionate creators turn their ideas into reality. Whether
                  you're launching a startup, building an innovative project, or
                  creating something meaningful, connect with supporters who
                  believe in your vision.
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
        {/* Fact Start*/}
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
        {/* Service Start */}
        <div className="container-fluid service py-7">
          <div className="container">
            <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Our Platform
              </small>
              <h1 className="display-5 mb-5">From Ideas to Impact</h1>
            </div>
            <div className="row g-4">
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.1s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-rocket fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Launch a Campaign</h4>
                      <p className="mb-4">
                        Turn your creative idea into a campaign, set your
                        funding goal, and share your vision with people who can
                        help bring it to life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.3s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-lightbulb fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Discover Projects</h4>
                      <p className="mb-4">
                        Explore innovative projects and inspiring ideas created
                        by passionate individuals, and find the ones you would
                        love to support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.5s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-hand-holding-heart fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Support Creators</h4>
                      <p className="mb-4">
                        Help creators turn their ideas into reality by
                        contributing to projects you believe in and becoming
                        part of their journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.7s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-shield-alt fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Secure Funding</h4>
                      <p className="mb-4">
                        Experience a safe and transparent way to support
                        campaigns, with clear funding goals and progress
                        tracking throughout the journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.1s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-chart-line fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Track Progress</h4>
                      <p className="mb-4">
                        Stay updated with campaign milestones, funding progress,
                        and project developments to see how every contribution
                        makes a difference.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.3s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-users fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Community Support</h4>
                      <p className="mb-4">
                        Join a community of creators and supporters who believe
                        in innovation, collaboration, and helping meaningful
                        ideas grow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.5s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-coins fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Flexible Contributions</h4>
                      <p className="mb-4">
                        Support the projects you care about by contributing an
                        amount that suits you, because every contribution can
                        create an impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 col-sm-12 wow bounceInUp"
                data-wow-delay="0.7s"
              >
                <div className="bg-light rounded service-item">
                  <div className="service-content d-flex align-items-center justify-content-center p-4">
                    <div className="service-content-icon text-center">
                      <i className="fas fa-seedling fa-7x text-primary mb-4" />
                      <h4 className="mb-3">Make an Impact</h4>
                      <p className="mb-4">
                        Be part of something meaningful by supporting innovative
                        ideas and helping transform creative visions into
                        real-world solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Service End */}
      </>
    </>
  );
}

export default Home;
