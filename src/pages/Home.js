import React from "react";
import Post from "../components/Post";
import Feed from "../components/Feed";
import Account from "../components/Account";

const Home = () => {
	return (
		<span className="Home">
			<Account></Account>
			<Post></Post>
			<Feed></Feed>
		</span>
	);
};

export default Home;
