import React from "react"
import { Link } from "react-router-dom"

const Index = (props) => {
	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4 text-center">
				<h2>Welcome to</h2>
				<h1>Rentals Market Place</h1>
				<p>Please click a category:</p>

				<div className="d-flex justify-content-between flex-column mt-5">
					<Link
						to={props.auth.name == "Guest" ? "/register" : "/property-create"}
						className="btn btn-primary btn-lg m-2">
						I am a Landlord / Caretaker looking for a tenant
					</Link>
					<Link
						to="/property"
						className="btn btn-primary btn-lg m-2">
						I am a Tenant looking for a House
					</Link>
				</div>
			</div>
			<div className="col-sm-4"></div>
		</div>
	)
}

export default Index
