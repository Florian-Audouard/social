import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";

const Account = () => {
	const [isLogIn, setIsLogIn] = useState(false);
	const [username, setUsername] = useState("");
	const navigate = useNavigate();
	function eraseCookie(name) {
		const date = new Date();
		date.setFullYear(date.getFullYear() - 100);
		let expires = "expires=" + date.toUTCString();
		document.cookie = name + "=" + 1 + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) === 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	useEffect(() => {
		let url_add = "";
		if (process.env.NODE_ENV === "development")
			url_add = "http://localhost:80";
		let localUsername = getCookie("username");
		let localPassword = getCookie("password");
		if (
			localUsername === "" ||
			localPassword === "" ||
			localPassword === undefined ||
			localUsername === undefined
		) {
			setIsLogIn(false);
			return;
		}
		fetch(url_add + "/LogIn", {
			method: "POST",
			body: JSON.stringify({
				username: localUsername,
				password: localPassword,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data === "True") {
					setIsLogIn(true);
					setUsername(localUsername);
				} else {
					setIsLogIn(false);
				}
			});
	}, []);
	return (
		<div id="account">
			{isLogIn ? (
				<div>
					<label>Connected</label>
					<div>{username.toUpperCase()}</div>
					<button
						onClick={(_) => {
							eraseCookie("username");
							eraseCookie("password");
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
