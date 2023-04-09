/** @format */

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "../lib/Axios"

const Property = (props) => {
	const [property, setProperty] = useState([])
	const [bedrooms, setBedrooms] = useState([])
	const bedroomOptons = [1, 2, 3, 4, 5]

	useEffect(() => {
		// Fetch Property
		Axios.get(`/api/property`).then((res) => setProperty(res.data))
	}, [])

	const changeBedrooms = (bedroom) => {
		var bedroom = Number(bedroom)
		if (bedrooms.includes(bedroom)) {
			bedrooms.splice(bedrooms.indexOf(bedroom), 1)
			setBedrooms([...bedrooms])
		} else {
			setBedrooms([...bedrooms, bedroom])
		}
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				<div className="d-flex justify-content-around">
					<div></div>
					<h1 className="text-center">Houses To Let</h1>
					<div className="dropdown">
						<button
							type="button"
							className="btn btn-primary dropdown-toggle"
							data-toggle="dropdown">
							Filters
						</button>
						<div className="dropdown-menu p-2">
							<form action="">
								{bedroomOptons.map((bedroom, key) => (
									<div
										key={key}
										className="form-check">
										<label className="form-check-label">
											<span className="d-none">{key++}</span>
											<input
												type="checkbox"
												value={key}
												className="form-check-input"
												onChange={(e) => changeBedrooms(e.target.value)}
											/>
											{key} Bedroom
										</label>
									</div>
								))}
							</form>
						</div>
					</div>
				</div>
				<div className="d-flex flex-wrap justify-content-center">
					{property
						.filter((item) =>
							bedrooms.length > 0
								? bedrooms.filter((bedroom) => bedroom == item.bedroom).length >
								  0
								: true
						)
						.filter((item) => item.status == "vacant")
						.map((property, key) => (
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
									<h5 className="card-title text-primary">{property.name}</h5>
									<h6 className="card-text text-success">
										Price: KES {property.price}
									</h6>
									<h6 className="card-text">Bedroom: {property.bedroom}</h6>
									<h6 className="card-text">Location: {property.location}</h6>
									<h6 className="card-text text-secondary">
										Description: {property.description}
									</h6>
									<Link
										to={`/property/${property.id}`}
										className="btn btn-primary">
										View
									</Link>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Property
