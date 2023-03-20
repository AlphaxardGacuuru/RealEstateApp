import React from "react"
import { Link } from "react-router-dom"

const TopNav = (props) => {
	return (
		<nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
			<div className="container">
				<Link
					className="navbar-brand"
					to="/">
					Real Estate App
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="{{ __('Toggle navigation') }}">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent">
					{/* <!-- Left Side Of Navbar --> */}
					<ul className="navbar-nav mr-auto"></ul>

					{/* <!-- Right Side Of Navbar --> */}
					<ul className="navbar-nav ml-auto">
						{/* <!-- Authentication Links --> */}
						{props.auth.name == "Guest" ? (
							<>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/login">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/register">
										Register
									</Link>
								</li>
							</>
						) : (
							<li className="nav-item dropdown">
								<Link
									id="navbarDropdown"
									className="nav-link dropdown-toggle"
									to="#"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false">
									{props.auth.name}
								</Link>

								<div
									className="dropdown-menu dropdown-menu-right"
									aria-labelledby="navbarDropdown">
									<Link
										className="dropdown-item"
										to="{{ route('logout') }}">
										Logout
									</Link>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default TopNav
