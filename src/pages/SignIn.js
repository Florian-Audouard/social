import React, { useState, useRef } from "react";
import md5 from "md5";
import "../styles/signin.scss";

const SignIn = () => {
	let url_add = "";
	if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";
	const [username, setUsername] = useState("");
	const [isUsernameValid, setIsUsernameValid] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");
	const input2 = useRef(null);
	const input3 = useRef(null);
	const keyInputHandler = (event) => {
		if (event.key !== "Enter") return;
		switch (event.target.id) {
			case "username":
				input2.current.focus();
				return;
			case "password1":
				input3.current.focus();
				return;
			case "password2":
				submit();
				return;
			default:
				return;
		}
	};
	const showPassword = (event) => {
		if (event.target.checked) {
			input2.current.type = "text";
			input3.current.type = "text";
		} else {
			input2.current.type = "password";
			input3.current.type = "pasword";
		}
	};
	const submit = () => {
		if (password !== passwordConfirm) {
			setError("Passwords are not the same");
		}
		fetch(url_add + "/SignIn", {
			method: "POST",
			body: JSON.stringify({ username, password: md5(password) }),
		});
	};
	return (
		<span className="signin">
			<div>Login :</div>
			<input
				type="text"
				id="username"
				value={username}
				className={isUsernameValid ? "green" : "red"}
				onChange={(e) => setUsername(e.target.value)}
				onKeyUp={(e) => {
					keyInputHandler(e);
					fetch(url_add + "/AvailableUsername", {
						method: "POST",
						body: username,
					})
						.then((res) => res.json())
						.then((data) => {
							setIsUsernameValid(data === "True");
						});
				}}
			/>
			<div>Password :</div>
			<input
				type="password"
				id="password1"
				ref={input2}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				onKeyUp={keyInputHandler}
			/>
			<div>Confirm Password :</div>
			<input
				type="password"
				id="password2"
				ref={input3}
				value={passwordConfirm}
				onChange={(e) => setPasswordConfirm(e.target.value)}
				onKeyUp={keyInputHandler}
			/>
			<br></br>
			<input type="checkbox" onChange={showPassword} /> Show password
			<br></br>
			<button onClick={submit}>Sign In</button>
			<div>{error}</div>
		</span>
	);
};

export default SignIn;
