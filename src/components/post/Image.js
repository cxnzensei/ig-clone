import PropTypes from "prop-types";

function Image({ docId, imageSrc }) {
	return (
		<div>
			<img className="object-cover w-full" src={imageSrc} alt={docId} />
		</div>
	);
}

export default Image;

Image.propTypes = {
	docId: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
};
