import React, { useState } from "react"
import ReactDOM from "react-dom"
import { HashRouter as Router, Route } from "react-router-dom"

import TopNav from "./TopNav"

import Login from "../pages/auth/login"
import Register from "../pages/auth/Register"

import Index from "../pages/Index"
import PropertyShow from "../pages/PropertyShow"

const App = () => {
	const [auth, setAuth] = useState({ id: 0, name: "Guest" })

	return (
		<Router>
			<TopNav {...{ auth }} />
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
				render={(props) => <Index {...{ auth }} />}
			/>
			<Route
				path="/property/:id"
				exact
				render={(props) => <PropertyShow {...{ auth }} />}
			/>
		</Router>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
