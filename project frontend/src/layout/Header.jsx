import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="container-fluid nav-bar">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand-lg py-4">
            <a href="index.html" className="navbar-brand">
              <h1 className="text-primary fw-bold mb-0">
                Idea<span className="text-dark">Fund</span>
              </h1>
            </a>
            <button
              className="navbar-toggler py-2 px-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <a href="/home" className="nav-item nav-link">
                  Home
                </a>
                <a href="/about" className="nav-item nav-link">
                  About
                </a>
                <a href="service.html" className="nav-item nav-link">
                  Services
                </a>
                <Link to={"/"} className="nav-item nav-link">
                  menu
                </Link>
                {/* <a href="menu.html" className="nav-item nav-link">
                  Menu
                </a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu bg-light">
                    <a href="book.html" className="dropdown-item">
                      Booking
                    </a>
                    <a href="blog.html" className="dropdown-item">
                      Our Blog
                    </a>
                    <a href="team.html" className="dropdown-item">
                      Our Team
                    </a>
                    <a href="testimonial.html" className="dropdown-item">
                      Testimonial
                    </a>
                    <a href="404.html" className="dropdown-item">
                      404 Page
                    </a>
                  </div>
                </div> */}
                <a href="/contact" className="nav-item nav-link">
                  Contact
                </a>
              </div>
              {/* <button
                class="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i class="fas fa-search"></i>
              </button> */}
              <Link
                to={"/login"}
                class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill me-3"
              >
                Login
              </Link>
              {/* <select name="" id="" class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill me-3">
                <option value="">Register</option>
                <option value="">User Register</option>
                <option value="">Investor Register</option>
              </select> */}
              <Link
                to={"/User_Register"}
                class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
