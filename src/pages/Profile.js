import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { logIn, getUsername } from "../helpers/LogIn";
import Feed from "../components/Feed";

const Profile = () => {
	let [usernameProfile, setUsernameProfile] = useState("");
	const tmpUsernameProfile = useParams().usernameProfile;
	const [isLogIn, setIsLogIn] = useState(false);
	useEffect(() => {
		setUsernameProfile(tmpUsernameProfile);
		if (getUsername !== tmpUsernameProfile) {
			setIsLogIn(false);
			return;
		}
		logIn(setIsLogIn);
	}, [tmpUsernameProfile]);
	return (
		<div>
			{usernameProfile}
			<Feed username={usernameProfile}></Feed>
		</div>
	);
};
export default Profile;
