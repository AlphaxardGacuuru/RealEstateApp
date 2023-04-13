/** @format */

import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Axios from "../../lib/Axios"

const Login = (props) => {
	const [phone, setPhone] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [remember, setRemember] = useState("")

	const history = useHistory()

	const onSubmit = (e) => {
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/api/login`, {
				phone: phone,
				email: email,
				password: password,
				remember: remember,
			})
				.then((res) => {
					props.setMessages(["Logged in"])
					// Update Logged in user
					Axios.get(`/api/auth`).then((res) => {
						props.setAuth(res.data)
						// Redirect and reload page
						setTimeout(() => {
							if (res.data.accountType == "landlord") {
								history.push("/profile")
							} else {
								history.push("/property")
							}
							location.reload()
						}, 1000)
					})
				})
				.catch((err) => props.getErrors(err))
		})
	}

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card">
						<div className="card-header">Login</div>

						<div className="card-body">
							<form onSubmit={onSubmit}>
								<div className="form-group row">
									<label
										htmlFor="email"
										className="col-md-4 col-form-label text-md-right">
										Login using your Phone Number
									</label>

									<div className="col-md-6">
										<input
											type="tel"
											className="form-control"
											name="johndoe@gmail.com"
											autoFocus={true}
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
											name="password"
											required={true}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
								</div>

								<div className="form-group row">
									<div className="col-md-6 offset-md-4">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												name="remember"
												id="remember"
												onChange={(e) => setRemember(e.target.value)}
											/>

											<label
												className="form-check-label"
												htmlFor="remember">
												Remember Me
											</label>
										</div>
									</div>
								</div>

								<div className="form-group row mb-0">
									<div className="col-md-8 offset-md-4">
										<button
											type="submit"
											className="btn btn-primary">
											Login
										</button>
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

export default Login
