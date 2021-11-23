import { useRef } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

function Post({ content }) {
	const commentInput = useRef(null);

	const handleFocus = () => commentInput.current.focus();
	return (
		<div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
			<Header username={content.username} />
			<Actions
				docId={content.docId}
				totalLikes={content.likes.length}
				handleFocus={handleFocus}
				likedPhoto={content.userLikedPhoto}
				imageSrc={content.imageSrc}
			/>
			<Footer username={content.username} caption={content.caption} />
			<Comments
				docId={content.docId}
				comments={content.comments}
				posted={content.dateCreated}
				commentInput={commentInput}
			/>
		</div>
	);
}

export default Post;

Post.propTypes = {
	content: PropTypes.shape({
		username: PropTypes.string.isRequired,
		imageSrc: PropTypes.string.isRequired,
		caption: PropTypes.string.isRequired,
		docId: PropTypes.string.isRequired,
		userLikedPhoto: PropTypes.bool.isRequired,
		comments: PropTypes.array.isRequired,
		likes: PropTypes.array.isRequired,
		dateCreated: PropTypes.number.isRequired,
	}),
};
