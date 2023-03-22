/** @format */

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "../lib/Axios"

const Index = (props) => {
	const [property, setProperty] = useState([])

	useEffect(() => {
		// Fetch Property
		Axios
			.get(`/api/property`)
			.then((res) => setProperty(res.data))
	}, [])

	return (
		<div className="row">
			<div className="col-sm-12">
				<div className="d-flex flex-wrap justify-content-center">
					{property.map((property, key) => (
						<div
							key={key}
							className="card m-2"
							style={{ width: "20rem" }}>
							<Link to={`/property/${property.id}`}>
								<img
									src={property.images}
									className="card-img-top"
									height="200rem"
								/>
							</Link>
							<div className="card-body">
								<h5 className="card-title text-primary">
									{property.name}
								</h5>
								<h6 className="card-text text-success">
									Price: KES {property.price}
								</h6>
								<h6 className="card-text">
									Bedroom: {property.bedroom}
								</h6>
								<h6 className="card-text">
									Location: {property.location}
								</h6>
								<h6 className="card-text text-secondary">
									Description: {property.description}
								</h6>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Index
