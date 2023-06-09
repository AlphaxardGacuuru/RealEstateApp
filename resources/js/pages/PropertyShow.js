import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PropertyShow = (props) => {
	const [property, setProperty] = useState({})

	let { id } = useParams()

	useEffect(() => {
		// Fetch Property
		axios
			.get(`/api/property/${id}`)
			.then((res) => setProperty(res.data[0]))
	}, [])

	return (
		<center>
			<div className="card m-2 w-75">
				<img
					src={property.images}
					className="card-img-top"
				/>
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
					<h6 className="card-text">Owner: {property.name}</h6>
					<h6 className="card-text">Contact: {property.phone}</h6>
					{props.auth.id == property.userId && (
						<Link
							to={`/property-edit/${property.id}`}
							className="btn btn-primary">
							Edit
						</Link>
					)}
				</div>
			</div>
		</center>
	)
}

export default PropertyShow
