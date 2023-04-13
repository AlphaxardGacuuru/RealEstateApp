import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import Axios from "../../lib/Axios"

const Register = (props) => {
	const history = useHistory()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const onSubmit = (e) => {
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/api/register`, {
				name: name,
				email: email,
				phone: phone,
				password: password,
				password_confirmation: confirmPassword,
			})
				.then((res) => {
					props.setMessages(["Account Created"])
					// Update Auth
					Axios.get(`/api/auth`).then((res) => props.setAuth(res.data))
					setTimeout(() => history.push("/"), 1000)
				})
				.catch((err) => props.getErrors(err))
		})
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<h5 className="text-center">
						Is this your first time here? <span className="fs-4">Register</span>
						, it's free
					</h5>
					<h1 className="text-center">Register</h1>
					<div className="card">
						{/* <div className="card-header">Register</div> */}

						<div className="card-body">
							<form onSubmit={onSubmit}>
								<div className="form-group row">
									<label
										htmlFor="name"
										className="col-md-4 col-form-label text-md-right">
										Name
									</label>

									<div className="col-md-6">
										<input
											type="text"
											className="form-control"
											placeholder="John Doe"
											required={true}
											autoComplete="name"
											autoFocus={true}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label
										htmlFor="email"
										className="col-md-4 col-form-label text-md-right">
										E-Mail Address
									</label>

									<div className="col-md-6">
										<input
											type="email"
											className="form-control"
											placeholder="johndoe@gmail.com"
											required={true}
											autoComplete="email"
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label
										htmlFor="email"
										className="col-md-4 col-form-label text-md-right">
										Landlord / Caretaker Phone
									</label>

									<div className="col-md-6">
										<input
											name="phone"
											type="phone"
											className="form-control"
											placeholder="0712345678"
											required={true}
											autoComplete="phone"
											onChange={(e) => setPhone(e.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row">
									<label
										htmlFor="password"
										className="col-md-4 col-form-label text-md-right">
										Password
									</label>

									<div className="col-md-6">
										<input
											type="password"
											className="form-control"
											placeholder="********"
											required={true}
											autoComplete="new-password"
											onChange={(e) => setPassword(e.target.value)}
										/>

										{/* <span */}
										{/* className="invalid-feedback" */}
										{/* role="alert"> */}
										{/* <strong>message</strong> */}
										{/* </span> */}
									</div>
								</div>

								<div className="form-group row">
									<label
										htmlFor="password-confirm"
										className="col-md-4 col-form-label text-md-right">
										Confirm Password
									</label>

									<div className="col-md-6">
										<input
											id="password-confirm"
											type="password"
											className="form-control"
											placeholder="********"
											required={true}
											autoComplete="new-password"
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									</div>
								</div>
								<br />

								<div className="form-group row mb-0 offset-md-4">
									<div className="col-md-6">
										<p>
											Already have an account? <Link to="/login">Login</Link>
										</p>
									</div>
									<div className="col-md-6">
										<button className="btn btn-primary">Register</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register
