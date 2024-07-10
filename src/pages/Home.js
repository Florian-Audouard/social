import React from "react";
import Feed from "../components/Feed";
import Account from "../components/Account";

const Home = () => {
	return (
		<span className="Home">
			<Account></Account>

			<Feed username={"all"}></Feed>
		</span>
	);
};

export default Home;
