import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
const Post = ({ username }) => {
	const [inputValue, setInputValue] = useState("");
	const [isPostActive, setIsPostActive] = useState(false);
	let url_add = "";
	if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";
	const sendMsg = () => {
		if (inputValue === "") return;
		fetch(url_add + "/msgFromHtml", {
			method: "POST",
			body: JSON.stringify({ username: username, message: inputValue }),
		});
		closePopup();
	};
	const keyInputHandler = (event) => {
		if (event.key !== "Enter") return;
		if (event.shiftKey) return;
		event.preventDefault();
		sendMsg();
	};
	const closePopup = () => {
		setIsPostActive(!isPostActive);
		setInputValue("");
	};
	const popupExitHandler = (event) => {
		if (event.target.id !== "postPopupScreen") return;
		closePopup();
	};
	return (
		<div id="post">
			<button onClick={closePopup}>POST</button>
			{isPostActive ? (
				<div id="postPopupScreen" onClick={popupExitHandler}>
					<div id="postPopup">
						<IoCloseSharp id="cross" onClick={closePopup} />
						<div id="postName">{username.toUpperCase()}</div>
						<textarea
							id="postTextArea"
							placeholder="Is there anything new ?"
							value={inputValue}
							autoFocus={true}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={keyInputHandler}
						/>
						<button id="sendButton" onClick={sendMsg}>
							Send
						</button>
					</div>
				</div>
			) : (
				<span></span>
			)}
		</div>
	);
};
export default Post;
