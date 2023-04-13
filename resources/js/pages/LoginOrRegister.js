import React from "react"
import { Link } from "react-router-dom"

const LoginOrRegister = () => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4 text-center">
				<div className="d-flex justify-content-between flex-column mt-5">
					<Link
						to="/login"
						className="btn btn-primary btn-lg m-2">
						Login
					</Link>
					<Link
						to="/register"
						className="btn btn-primary btn-lg m-2">
						Register
					</Link>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default LoginOrRegister
