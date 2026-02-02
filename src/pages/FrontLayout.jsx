import { NavLink, Outlet } from "react-router-dom";

function FrontLayout() {
  return (
    <>
      <header className="front">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="#">
              Navbar
            </a> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "burger-active" : ""}`
                    }
                    aria-current="page"
                    to="/"
                  >
                    首頁
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "burger-active" : ""}`
                    }
                    to="/products"
                  >
                    產品列表
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "burger-active" : ""}`
                    }
                    to="cart"
                  >
                    購物車
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="front">
        <Outlet />
      </main>
      <footer className="front"></footer>
    </>
  );
}

export default FrontLayout;
