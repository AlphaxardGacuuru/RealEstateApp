import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
)

const PropertyEdit = (props) => {
	const [property, setProperty] = useState({})
	const [name, setName] = useState("")
	const [images, setImages] = useState("")
	const [bedroom, setBedroom] = useState("")
	const [price, setPrice] = useState("")
	const [location, setLocation] = useState("")
	const [description, setDescription] = useState("")

	let { id } = useParams()

	useEffect(() => {
		// Fetch Property
		axios
			.get(`/api/property/${id}`)
			.then((res) => setProperty(res.data[0]))
			.catch(() => console.log(["Failed to fetch bought videos"]))
	}, [])

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]')

	// Declare new FormData object for form data
	const formData = new FormData()

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		name && formData.append("name", name)
		images && formData.append("images", images)
		bedroom && formData.append("bedroom", bedroom)
		price && formData.append("price", price)
		location && formData.append("location", location)
		description && formData.append("description", description)
		formData.append("_method", "put")

		// Send data to UsersController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get("sanctum/csrf-cookie").then(() => {
			axios
				.post(`/api/property/${id}`, formData)
				.then((res) => {
					props.setMessages([res.data])
					// Update Property
					axios
						.get(`/api/property/${id}`)
						.then((res) => setProperty(res.data[0]))

					window.location.reload()
				})
				.catch((err) => props.getErrors(err))
		})
	}

	return (
		<center>
			<div className="card m-2 w-75">
				<div>
					<img
						className="card-img-top"
						src={property.images}
						alt="Card image"
					/>
					<FilePond
						name="filepond-property-images"
						labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Update image </span>'
						imageCropAspectRatio="1:1"
						acceptedFileTypes={["image/*"]}
						allowRevert={true}
						server={{
							url: `${props.url}/api`,
							process: {
								url: `/propertyImages`,
								headers: { "X-CSRF-TOKEN": token.content },
								onload: (res) => {
									setImages(res)
									// Update Property
									axios
										.get(`/api/property/${id}`)
										.then((res) => setProperty(res.data[0]))
								},
								onerror: (err) => console.log(err.response),
							},
						}}
					/>
				</div>
				<form onSubmit={onSubmit}>
					<div className="card-body">
						<h6 className="card-title d-flex justify-between">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Name
							</label>
							<input
								type="text"
								className="form-control"
								placeholder={property.name}
								onChange={(e) => setName(e.target.value)}
							/>
						</h6>
						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Price
							</label>
							<input
								type="number"
								className="form-control"
								placeholder={property.price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</h6>
						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Bedroom
							</label>
							<input
								type="number"
								className="form-control"
								placeholder={property.bedroom}
								onChange={(e) => setBedroom(e.target.value)}
							/>
						</h6>
						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Location
							</label>
							<input
								type="text"
								className="form-control"
								placeholder={property.location}
								onChange={(e) => setLocation(e.target.value)}
							/>
						</h6>
						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Description
							</label>
							<input
								type="text"
								className="form-control"
								placeholder={property.description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</h6>
						<div className="d-flex justify-content-between mt-4">
							<Link
								to={`/property/${id}`}
								className="btn btn-danger">
								Cancel
							</Link>
							<button className="btn btn-primary">
								Save Changes
							</button>
						</div>
					</div>
				</form>
			</div>
		</center>
	)
}

export default PropertyEdit
