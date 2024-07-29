import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlinePicture } from "react-icons/ai";
import FileContainer from "./FileContainer";

const Post = ({ username }) => {
	const [inputValue, setInputValue] = useState("");
	const [isPostActive, setIsPostActive] = useState(false);
	const [arrayOfFiles, setArrayOfFiles] = useState([]);
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
		setArrayOfFiles([]);
	};
	const popupExitHandler = (event) => {
		if (event.target.id !== "postPopupScreen") return;
		closePopup();
	};
	const addPictureHandler = () => {
		let input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.multiple = true;
		input.onchange = (_) => {
			let localArray = arrayOfFiles.concat(Array.from(input.files));
			if (localArray.length > 4) {
				console.log("error");
				return;
			}
			setArrayOfFiles(localArray);
		};
		input.click();
	};
	function auto_grow(reactElement) {
		const element = reactElement.target;

		if (element.scrollHeight - 4 > 280) {
			const lastChar = element.value[element.value.length - 1];
			console.log(lastChar !== "\n");
			if (lastChar !== "\n") element.maxLength = 1;
			element.value = element.value.substring(
				0,
				element.value.length - 1
			);
			return;
		}
		element.maxLength = 1000;
		element.style.height = "5px";
		element.style.height = element.scrollHeight - 4 + "px";
	}
	return (
		<div id="post">
			<button onClick={closePopup}>POST</button>
			{isPostActive ? (
				<div id="postPopupScreen" onClick={popupExitHandler}>
					<div id="postPopup">
						<IoCloseSharp id="cross" onClick={closePopup} />
						<div id="postName">{username.toUpperCase()}</div>
						<textarea
							className={
								"postTextArea" +
								(arrayOfFiles.length !== 0 ? " reduceSize" : "")
							}
							placeholder="Is there anything new ?"
							value={inputValue}
							autoFocus={true}
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={keyInputHandler}
							onInput={auto_grow}
						/>
						{arrayOfFiles.length !== 0 ? (
							<FileContainer arrayOfFiles={arrayOfFiles} />
						) : (
							<span></span>
						)}
						<div id="bottomPost">
							<AiOutlinePicture
								id="pictureAdd"
								onClick={addPictureHandler}
							/>
							<button id="sendButton" onClick={sendMsg}>
								Send
							</button>
						</div>
					</div>
				</div>
			) : (
				<span></span>
			)}
		</div>
	);
};
export default Post;
