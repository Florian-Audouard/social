import React, { useState, useEffect } from "react";
import Post from "../components/Post";
// import Feed from "../components/Feed";
import Account from "../components/Account";

const Home = () => {
	const [isLogIn, setIsLogIn] = useState(false);
	const [username, setUsername] = useState("");
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
		setIsLogIn(true);
		setUsername(localUsername);
	}, []);
	return (
		<span className="Home">
			<Account
				isLogIn={isLogIn}
				setIsLogIn={setIsLogIn}
				username={username}
			></Account>
			{isLogIn ? <Post username={username}></Post> : <span></span>}
		</span>
	);
};

export default Home;
