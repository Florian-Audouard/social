import React, { useState } from "react";

const Post = ({ username }) => {
	const [inputValue, setInputValue] = useState("");
	let url_add = "";
	if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";
	const sendMsg = () => {
		if (inputValue === "") return;
		fetch(url_add + "/msgFromHtml", {
			method: "POST",
			body: JSON.stringify({ username: username, message: inputValue }),
		});
		setInputValue("");
	};
	const keyInputHandler = (event) => {
		if (event.key !== "Enter") return;
		sendMsg();
	};
	return (
		<div>
			<input
				type="text"
				id="post"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyUp={keyInputHandler}
			/>
			<button onClick={sendMsg}>Send</button>
		</div>
	);
};
export default Post;
