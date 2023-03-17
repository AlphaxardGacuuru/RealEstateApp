import React from 'react'

const TopNav = () => {
	return (
		<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
			<div class="container">
				<a class="navbar-brand" href="{{ url('/') }}">
					Real Estate App
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					{/* <!-- Left Side Of Navbar --> */}
					<ul class="navbar-nav mr-auto">

					</ul>

					{/* <!-- Right Side Of Navbar --> */}
					<ul class="navbar-nav ml-auto">
						{/* <!-- Authentication Links --> */}
						{/* @guest */}
						<li class="nav-item">
							<a class="nav-link" href="{{ route('login') }}">Login</a>
						</li>
						{/* @if (Route::has('register')) */}
						<li class="nav-item">
							<a class="nav-link" href="{{ route('register') }}">Register</a>
						</li>
						{/* @endif */}
						{/* @else */}
						<li class="nav-item dropdown">
							<a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
								Name
							</a>

							<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
								<a class="dropdown-item" href="{{ route('logout') }}"
									onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
									Logout
								</a>

							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default TopNav