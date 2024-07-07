import React, { useEffect, useState } from "react";

const Feed = () => {
	const [feed, setFeed] = useState([]);
	let url_add = "";
	if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";
	useEffect(() => {
		const interval = setInterval(() => {
			fetch(url_add + "/getDatabase")
				.then((res) => res.json())
				.then((data) => {
					setFeed(data.reverse());
				});
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	return (
		<div>
			{feed.map((test) => (
				<div key={"key" + test[0]}>{test[1]}</div>
			))}
		</div>
	);
};
export default Feed;
