import React, { useState, useRef } from "react";
import md5 from "md5";
import { useNavigate } from "react-router-dom";
import "../styles/signin.scss";

const SignIn = () => {
	const navigate = useNavigate();
	let url_add = "";
	if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";
	const [username, setUsername] = useState("");
	const [isUsernameValid, setIsUsernameValid] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [textConnection, setTextConnection] = useState("");
	const input2 = useRef(null);
	const input3 = useRef(null);

	function setCookie(cname, cvalue) {
		const date = new Date();
		date.setFullYear(date.getFullYear() + 100);
		let expires = "expires=" + date.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

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
			input3.current.type = "password";
		}
	};
	const submit = () => {
		console.log("allo");
		if (username === "") {
			setTextConnection("Username can't be empty");
			return;
		}
		if (password === "") {
			setTextConnection("Password can't be empty");
			return;
		}
		if (password !== passwordConfirm) {
			setTextConnection("Passwords are not the same");
			return;
		}
		fetch(url_add + "/SignIn", {
			method: "POST",
			body: JSON.stringify({ username, password: md5(password) }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data === "True") {
					setTextConnection("Account created");
					setCookie("username", username);
					setCookie("password", md5(password));
					setTimeout((_) => {
						navigate("/");
					}, 2000);
				} else {
					setTextConnection("Username allready used");
				}
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
					if (e.target.value === "") {
						setIsUsernameValid(false);
						return;
					}
					fetch(url_add + "/AvailableUsername", {
						method: "POST",
						body: e.target.value,
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
			<input
				type="checkbox"
				onChange={showPassword}
				id="passwordSignIn"
			/>
			<label for="passwordSignIn">Show password</label>
			<br></br>
			<button onClick={SignIn}>Sign In</button>
			<div>{textConnection}</div>
		</span>
	);
};

export default SignIn;
