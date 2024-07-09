const Message = ({ autor, message }) => {
	return (
		<div id="container">
			<span>
				<div id="autor">{autor}</div>
				<pre id="message">{message}</pre>
			</span>
		</div>
	);
};
export default Message;
