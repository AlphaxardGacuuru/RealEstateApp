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
	const [status, setStatus] = useState("vacant")
	const [payment, setPayment] = useState("")

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
		formData.append("status", status)

		// Send data to UsersController
		// Get csrf cookie from Laravel inorder to send a POST request
		axios.get("sanctum/csrf-cookie").then(() => {
			axios
				.post(`/api/property`, formData)
				.then((res) => {
					props.setMessages([res.data])
					history.push("/property")
				})
				.catch((err) => props.getErrors(err))
		})
	}

	return (
		<center>
			<h1 className="text-center">Upload Property</h1>

			<div className="card m-2 w-75">
				<div>
					<FilePond
						name="filepond-property-images"
						labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Update image </span>'
						imageCropAspectRatio="1:1"
						acceptedFileTypes={["image/*"]}
						allowRevert={true}
						server={{
							url: `/api`,
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
								Property Name
							</label>

							<input
								type="text"
								className="form-control"
								placeholder="e.g. Wilson Heights"
								required={true}
								onChange={(e) => setName(e.target.value)}
							/>
						</h6>

						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Property Rent
							</label>

							<input
								type="number"
								className="form-control"
								placeholder="e.g. 20000"
								required={true}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</h6>

						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								No of Bedrooms
							</label>

							<input
								type="number"
								className="form-control"
								placeholder="e.g. 2"
								required={true}
								onChange={(e) => setBedroom(e.target.value)}
							/>
						</h6>

						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Property Location
							</label>

							<input
								type="text"
								className="form-control"
								placeholder="e.g. Ngumba Estate"
								required={true}
								onChange={(e) => setLocation(e.target.value)}
							/>
						</h6>

						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Property Description
							</label>

							<input
								type="text"
								className="form-control"
								placeholder="e.g. In good condition"
								required={true}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</h6>

						<h6 className="card-text d-flex">
							<label
								htmlFor="status"
								className="text-left w-25 mr-2">
								Property Status
							</label>

							<select
								name="status"
								className="form-control"
								required={true}
								onChange={(e) => setStatus(e.target.value)}>
								<option value="vacant">Vacant</option>
								<option value="occupied">Occupied</option>
							</select>
						</h6>
						<br />

						<h3>Payment</h3>
						<h4>BUY GOODS: Jambo Africa Programme</h4>
						<h4>TILL No: 763614</h4>

						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Duration
							</label>

							<select
								name="status"
								className="form-control"
								disabled={true}
								// required={true}
								onChange={(e) => setPayment(e.target.value)}>
								<option value="1">1 Month</option>
								<option value="2">2 Months</option>
								<option value="3">3 Months</option>
							</select>
						</h6>

						<h6 className="card-text d-flex">
							<label
								htmlFor=""
								className="text-left w-25 mr-2">
								Bill
							</label>

							<input
								type="text"
								className="form-control"
								placeholder="KES 0"
								disabled={true}
								// required={true}
							/>
						</h6>

						<div className="d-flex justify-content-between mt-4">
							<Link
								to="/"
								className="btn btn-danger">
								Cancel
							</Link>
							<button className="btn btn-primary">Create Post</button>
						</div>
					</div>
				</form>
			</div>
		</center>
	)
}

export default PropertyCreate
