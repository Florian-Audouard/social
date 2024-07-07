import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const keyInputHandler = (event) => {
		if (event.key !== "Enter") return;
		switch (event.target.id) {
			case "username":
				return;
			case "password":
				return;
			default:
				return;
		}
	};
	return (
		<span className="login">
			<div>Login :</div>
			<input
				type="text"
				id="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				onKeyUp={keyInputHandler}
			/>
			<div>Password :</div>
			<input
				type="text"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				onKeyUp={keyInputHandler}
			/>
			<br></br>
			<button>Log in</button>
			<button onClick={(_) => navigate("/signin")}>Sign in</button>
		</span>
	);
};

export default Login;
