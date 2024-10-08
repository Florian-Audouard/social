import React, { useEffect, useState } from "react";
import Message from "./Message";

const Feed = ({ username }) => {
	const [feed, setFeed] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			let url_add = "";
			if (process.env.NODE_ENV === "development")
				url_add = "http://localhost:80";
			fetch(url_add + "/getFeed", {
				method: "POST",
				body: JSON.stringify({
					username: username,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setFeed(data.reverse());
				});
		}, 1000);
		return () => clearInterval(interval);
	}, [username]);
	return (
		<div id="feed">
			{feed.map((test) => (
				<Message
					key={test[0]}
					autor={test[2]}
					message={test[1]}
				></Message>
			))}
		</div>
	);
};
export default Feed;
