import React, { useState } from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route } from "react-router-dom"

import TopNav from "./TopNav"

import Login from "../pages/auth/login"
import Register from "../pages/auth/Register"

import Index from "../pages/Index"
import PropertyShow from "../pages/PropertyShow"
import PropertyEdit from "../pages/PropertyEdit"
import PropertyCreate from "../pages/PropertyCreate"

const App = () => {
	const url = "http://localhost:8000"

	const [auth, setAuth] = useState({ id: 1, name: "Guest" })

	return (
		<Router>
			<TopNav {...{ url, auth }} />
			<br />

			<Route
				path="/register"
				exact
				render={(props) => <Register />}
			/>
			<Route
				path="/login"
				exact
				render={(props) => <Login />}
			/>
			<Route
				path="/"
				exact
				render={(props) => <Index {...{ url, auth }} />}
			/>
			<Route
				path="/property/:id"
				exact
				render={(props) => <PropertyShow {...{ url, auth }} />}
			/>
			<Route
				path="/property-create"
				exact
				render={(props) => <PropertyCreate {...{ url, auth }} />}
			/>
			<Route
				path="/property-edit/:id"
				exact
				render={(props) => <PropertyEdit {...{ url, auth }} />}
			/>
		</Router>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
