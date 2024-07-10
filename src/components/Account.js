import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import { logIn } from "../helpers/LogIn";
import { disconnect } from "../helpers/Disconnect";

const Account = () => {
	const [isLogIn, setIsLogIn] = useState(false);
	const [username, setUsername] = useState("");
	const navigate = useNavigate();
	useEffect(() => {
		logIn(setIsLogIn, setUsername);
	}, []);
	return (
		<div id="account">
			{isLogIn ? (
				<div>
					<label>Connected</label>
					<div
						className="autor"
						onClick={(_) => navigate("/profile/" + username)}
					>
						{username.toUpperCase()}
					</div>
					<button
						onClick={(_) => {
							disconnect();
							setIsLogIn(false);
						}}
					>
						DISCONNECT
					</button>
					<Post username={username}></Post>
				</div>
			) : (
				<button onClick={(_) => navigate("/login")}>Login</button>
			)}
		</div>
	);
};
export default Account;
