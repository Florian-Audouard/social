
const FileContainer = ({ arrayOfFiles }) => {

	return (
		<div id="imgArea" >
			{arrayOfFiles.map((file, indice) => (
				<img
					className="file"
					key={indice}
					alt={file.name}
					src={URL.createObjectURL(file)}
				></img>
			))}
		</div>
	);
};
export default FileContainer;
