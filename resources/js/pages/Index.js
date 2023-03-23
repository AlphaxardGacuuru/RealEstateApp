import React from "react"
import { Link } from "react-router-dom"

const Index = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<div className="d-flex justify-content-between mt-5">
					<Link
						to="/property"
						className="btn btn-primary btn-lg">
						Tenant
					</Link>
					<Link
						to={props.auth.name == "Guest" ? "/register" : "/property-create"}
						className="btn btn-primary btn-lg">
						Landlord
					</Link>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Index
