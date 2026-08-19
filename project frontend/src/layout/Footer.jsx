function Footer() {
  return (
    <>
      <>
        {/* Footer Start */}
        <div
          className="container-fluid footer py-6 my-6 mb-0 bg-light wow bounceInUp"
          data-wow-delay="0.1s"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h1 className="text-primary">
                    Idea<span className="text-dark">Fund</span>
                  </h1>
                  <p className="lh-lg mb-4">
                    IdeaFund is a crowdfunding platform that connects innovative ideas with people who believe in them and want to make an impact.
                  </p>
                  <div className="footer-icon d-flex">
                    <a
                      className="btn btn-primary btn-sm-square me-2 rounded-circle"
                      href=""
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-primary btn-sm-square me-2 rounded-circle"
                      href=""
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary btn-sm-square me-2 rounded-circle"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-primary btn-sm-square rounded-circle"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 ms-5">
                <div className="footer-item">
                  <h4 className="mb-4">Quick Links</h4>
                  <div className="d-flex flex-column align-items-start">
                    <a className="text-body mb-3" href="">
                      <i className="fa fa-check text-primary me-2" />
                      Home
                    </a>
                    <a className="text-body mb-3" href="">
                      <i className="fa fa-check text-primary me-2" />
                      Explore Projects
                    </a>
                    <a className="text-body mb-3" href="">
                      <i className="fa fa-check text-primary me-2" />
                      Start a Campaign
                    </a>
                    <a className="text-body mb-3" href="">
                      <i className="fa fa-check text-primary me-2" />
                      About Us
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer-item">
                  <h4 className="mb-4">Contact Us</h4>
                  <div className="d-flex flex-column align-items-start">
                    <p>
                      <i className="fa fa-map-marker-alt text-primary me-2" />{" "}
                      Punjab, India
                    </p>
                    <p>
                      <i className="fa fa-phone-alt text-primary me-2" /> 
                      +91 XXXXX XXXXX
                    </p>
                    <p>
                      <i className="fas fa-envelope text-primary me-2" />{" "}
                      info@example.com
                    </p>
                    <p>
                      <i className="fa fa-clock text-primary me-2" /> 24/7 Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer End */}
        {/* Copyright Start */}
        <div className="container-fluid copyright bg-dark py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <span className="text-light">
                  <a href="#">
                    <i className="fas fa-copyright text-light me-2" />
                    IdeaFund
                  </a>
                  , All right reserved.
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Copyright End */}
      </>
    </>
  );
}

export default Footer;
