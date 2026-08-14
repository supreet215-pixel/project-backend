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
                <Link to={"/"} className="nav-item nav-link">
                  Home
                </Link>
                <Link to={"/user/addPitch"} className="nav-item nav-link">
                  Add Pitch
                </Link>
                <Link to={"/user/managePitch"} className="nav-item nav-link">
                  Manage Pitch
                </Link>
                {/* <link href="event.html" className="nav-item nav-link"/>
            Events
          
          <link href="menu.html" className="nav-item nav-link"/>
            Menu
          
          <div className="nav-item dropdown">
            <link
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
            />
              Pages
            
            <div className="dropdown-menu bg-light">
              <link href="book.html" className="dropdown-item"/>
                Booking
              
              <link href="blog.html" className="dropdown-item"/>
                Our Blog
              
              <link href="team.html" className="dropdown-item"/>
                Our Team
              
              <link href="testimonial.html" className="dropdown-item"/>
                Testimonial
              
              <link href="404.html" className="dropdown-item"/>
                404 Page
              
            </div>
          </div> */}
                <Link to={"/"} className="nav-item nav-link">
                  Contact
                </Link>
              </div>
              <button
                className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex"
                data-bs-toggle="modal"
                data-bs-target="#searchModal"
              >
                <i className="fas fa-search" />
              </button>
              <Link
                to={"/login"}
                class="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill"
              >
                LogOut
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
