const Message = ({ autor, message }) => {
	return (
		<div>
			<span>{autor} : </span>
			<span>{message}</span>
		</div>
	);
};
export default Message;
