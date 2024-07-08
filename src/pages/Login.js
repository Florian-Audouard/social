import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import md5 from "md5";

const Login = () => {
	const navigate = useNavigate();
	// let url_add = "";
	// if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	// const [textConnection, setTextConnection] = useState("");

	const input2 = useRef(null);
	// function setCookie(cname, cvalue) {
	// 	const date = new Date();
	// 	date.setFullYear(date.getFullYear() + 100);
	// 	let expires = "expires=" + date.toUTCString();
	// 	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	// }
	const keyInputHandler = (event) => {
		if (event.key !== "Enter") return;
		switch (event.target.id) {
			case "username":
				input2.current.focus();
				return;
			case "password":
				logIn();
				return;
			default:
				return;
		}
	};
	const logIn = () => {
		console.log("ptdrr ?");
		// setTextConnection("allo ?");
		// if (username === "") {
		// 	setTextConnection("Username can't be empty");
		// 	return;
		// }
		// if (password === "") {
		// 	setTextConnection("Password can't be empty");
		// 	return;
		// }
		// fetch(url_add + "/LogIn", {
		// 	method: "POST",
		// 	body: JSON.stringify({ username, password: md5(password) }),
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		if (data === "True") {
		// 			setTextConnection("Connected");
		// 			setCookie("username", username);
		// 			setCookie("password", md5(password));
		// 			setTimeout((_) => {
		// 				navigate("/");
		// 			}, 2000);
		// 		} else {
		// 			setTextConnection("Invalid username or password");
		// 		}
		// 	});
	};
	const showPassword = (event) => {
		if (event.target.checked) {
			input2.current.type = "text";
		} else {
			input2.current.type = "password";
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
				type="password"
				id="password"
				ref={input2}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				onKeyUp={keyInputHandler}
			/>
			<br></br>
			{/* <input type="checkbox" onChange={showPassword} /> Show password */}
			<br></br>
			<button onClick={logIn}>Log in</button>
			<button onClick={(_) => navigate("/signin")}>Sign in</button>
			{/* <div>{textConnection}</div> */}
		</span>
	);
};

export default Login;
