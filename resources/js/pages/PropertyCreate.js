import axios from "axios"
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"

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

const PropertyCreate = (props) => {
	const history = useHistory()
	const [name, setName] = useState("")
	const [images, setImages] = useState("")
	const [bedroom, setBedroom] = useState("")
	const [price, setPrice] = useState("")
	const [location, setLocation] = useState("")
	const [description, setDescription] = useState("")

	// Get csrf token
	const token = document.head.querySelector('meta[name="csrf-token"]')

	// Declare new FormData object for form data
	const formData = new FormData()

	const onSubmit = (e) => {
		e.preventDefault()

		// Add form data to FormData object
		formData.append("name", name)
		formData.append("images", images)
		formData.append("bedroom", bedroom)
		formData.append("price", price)
		formData.append("location", location)
		formData.append("description", description)

		// Send data to UsersController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get("sanctum/csrf-cookie").then(() => {
			axios
				.post(`${props.url}/api/property`, formData)
				.then((res) => {
					props.setMessages([res.data])
					history.push("/")
				})
				.catch((err) => props.getErrors(err))
		})
	}

	return (
		<center>
			<div className="card m-2 w-75">
				<div>
					<FilePond
						name="filepond-property-images"
						labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Update image </span>'
						imageCropAspectRatio="1:1"
						acceptedFileTypes={["image/*"]}
						allowRevert={true}
						server={{
							url: `http://localhost:8000/api`,
							process: {
								url: `/propertyImages`,
								headers: { "X-CSRF-TOKEN": token.content },
								onload: (res) => setImages(res),
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
								placeholder="Name"
								required={true}
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
								placeholder="Price"
								required={true}
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
								placeholder="Bedroom"
								required={true}
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
								placeholder="Location"
								required={true}
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
								placeholder="Description"
								required={true}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</h6>
						<div className="d-flex justify-content-between mt-4">
							<Link
								to="/"
								className="btn btn-danger">
								Cancel
							</Link>
							<button className="btn btn-primary">
								Create Post
							</button>
						</div>
					</div>
				</form>
			</div>
		</center>
	)
}

export default PropertyCreate
