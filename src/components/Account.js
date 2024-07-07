import React from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
	const navigate = useNavigate();

	return (
		<div>
			<button onClick={(_) => navigate("/login")}>Login</button>
		</div>
	);
};
export default Account;
