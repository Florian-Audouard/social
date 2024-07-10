import { useNavigate } from "react-router-dom";

const Message = ({ autor, message }) => {
	const navigate = useNavigate();

	return (
		<div id="container">
			<span>
				<div
					className="autor"
					onClick={(_) => navigate("/profile/" + autor)}
				>
					{autor.toUpperCase()}
				</div>
				<pre id="message">{message}</pre>
			</span>
		</div>
	);
};
export default Message;
