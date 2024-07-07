import React from "react";
import { useNavigate } from "react-router-dom";

const Account = ({ isLogIn, setIsLogIn, username }) => {
	const navigate = useNavigate();
	function eraseCookie(name) {
		const date = new Date();
		date.setFullYear(date.getFullYear() - 100);
		let expires = "expires=" + date.toUTCString();
		document.cookie = name + "=" + 1 + ";" + expires + ";path=/";
	}
	return (
		<div>
			{isLogIn ? (
				<div>
					<div>{username}</div>
					<button
						onClick={(_) => {
							eraseCookie("username");
							eraseCookie("password");
							setIsLogIn(false);
						}}
					>
						Disconnect
					</button>
				</div>
			) : (
				<button onClick={(_) => navigate("/login")}>Login</button>
			)}
		</div>
	);
};
export default Account;
