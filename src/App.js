import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/profile/:usernameProfile" element={<Profile />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/signin" exact element={<SignIn />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
