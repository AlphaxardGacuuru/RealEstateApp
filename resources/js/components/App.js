import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route } from "react-router-dom"

import TopNav from "./TopNav"
import Messages from "./Messages"

import Login from "../pages/auth/login"
import Register from "../pages/auth/Register"

import Index from "../pages/Index"
import Property from "../pages/Property"
import PropertyShow from "../pages/PropertyShow"
import PropertyEdit from "../pages/PropertyEdit"
import PropertyCreate from "../pages/PropertyCreate"
import Profile from "../pages/User/Profile"

const App = () => {
	// Redirect if URL is not secure
	var unsecureUrl = window.location.href.match(/http:\/\/www.onesoko.co.ke/)

	if (unsecureUrl) {
		window.location.href = "https://www.onesoko.co.ke"
	}

	const url = process.env.MIX_APP_URL

	// Declare states
	const [messages, setMessages] = useState([])
	const [errors, setErrors] = useState([])
	const [auth, setAuth] = useState({ id: 1, name: "Guest" })

	// Function for fetching data from API
	const get = (endpoint, setState, storage = null, errors = true) => {
		axios.get(`/api/${endpoint}`).then((res) => {
			var data = res.data ? res.data : []
			setState(data)
			// storage && setLocalStorage(storage, data)
		})
		// .catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]))
	}

	// Function for getting errors from responses
	const getErrors = (err, message = false) => {
		const resErrors = err.response.data.errors
		var newError = []
		for (var resError in resErrors) {
			newError.push(resErrors[resError])
		}
		// Get other errors
		message && newError.push(err.response.data.message)
		setErrors(newError)
	}

	// Reset Messages and Errors to null after 3 seconds
	if (errors.length > 0 || messages.length > 0) {
		setTimeout(() => setErrors([]), 2900)
		setTimeout(() => setMessages([]), 2900)
	}

	useEffect(() => {
		get("auth", setAuth)
	}, [])

	const STATE = {
		messages,
		setMessages,
		errors,
		setErrors,
		get,
		getErrors,
		url,
		auth,
		setAuth,
	}

	return (
		<Router>
			<TopNav {...STATE} />
			<br />

			<Route
				path="/register"
				exact
				render={(props) => <Register {...STATE} />}
			/>
			<Route
				path="/login"
				exact
				render={(props) => <Login {...STATE} />}
			/>
			<Route
				path="/"
				exact
				render={(props) => <Index {...STATE} />}
			/>
			<Route
				path="/profile"
				exact
				render={(props) => <Profile {...STATE} />}
			/>
			<Route
				path="/property"
				exact
				render={(props) => <Property {...STATE} />}
			/>
			<Route
				path="/property/:id"
				exact
				render={(props) => <PropertyShow {...STATE} />}
			/>
			<Route
				path="/property-create"
				exact
				render={(props) => <PropertyCreate {...STATE} />}
			/>
			<Route
				path="/property-edit/:id"
				exact
				render={(props) => <PropertyEdit {...STATE} />}
			/>

			<Messages {...STATE} />
		</Router>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
