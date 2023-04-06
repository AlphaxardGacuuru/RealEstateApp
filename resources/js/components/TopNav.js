import React from "react"
import { Link } from "react-router-dom"

const TopNav = (props) => {
	const logout = (e) => {
		e.preventDefault()

		axios.get("/sanctum/csrf-cookie").then(() => {
			axios.post(`/api/logout`).then((res) => {
				props.setMessages(["Logged out"])
				// Update Auth
				props.setAuth({ name: "Guest" })
			})
		})
	}

	var display

	// Hide TopNav from various pages
	location.pathname.match("/")
		? (display = "none")
		: (display = "")

	return (
		<nav
			className="navbar navbar-expand-md navbar-light bg-white shadow-sm"
			style={{ display: display }}>
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
										to="/login"
										className="nav-link">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to="/register"
										className="nav-link">
										Register
									</Link>
								</li>
							</>
						) : (
							<>
								<li className="nav-item">
									<Link
										to="/property-create"
										className="nav-link">
										Create Post
									</Link>
								</li>
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
											to="/profile"
											className="dropdown-item">
											My Property
										</Link>
										<a
											className="dropdown-item"
											onClick={logout}>
											Logout
										</a>
									</div>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default TopNav
