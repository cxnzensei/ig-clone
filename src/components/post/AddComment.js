import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { EmojiHappyIcon } from "@heroicons/react/outline";

function AddComment({ docId, comments, setComments, commentInput }) {
	const [comment, setComment] = useState("");
	const { firebase, FieldValue } = useContext(FirebaseContext);
	const {
		user: { displayName },
	} = useContext(UserContext);

	const handleSubmitComment = (event) => {
		let timeStamp = Date.now();
		event.preventDefault();
		setComments([{ displayName, comment, timeStamp }, ...comments]);
		setComment("");
		return firebase
			.firestore()
			.collection("photos")
			.doc(docId)
			.update({
				comments: FieldValue.arrayUnion({
					displayName,
					comment,
					timeStamp,
				}),
			});
	};

	return (
		<div className="border-t border-gray-primary">
			<div>
				<form
					className="flex justify-between pl-0 pr-5"
					method="POST"
					onSubmit={(event) =>
						comment.length >= 1
							? handleSubmitComment(event)
							: event.preventDefault()
					}
				>
					<div className="flex items-center ml-3">
						<EmojiHappyIcon className="w-8 h-8" />
					</div>
					<input
						type="text"
						aria-label="Add a Comment"
						autoComplete="off"
						className="text-sm text-gray-base w-full mr-3 py-5 outline-none px-4"
						name="AddComment"
						placeholder="Add a Comment"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
						ref={commentInput}
					/>
					<button
						className={`text-sm font-semibold text-blue-medium ${
							!comment && "opacity-25"
						}`}
						type="button"
						disabled={comment.length < 1}
						onClick={handleSubmitComment}
					>
						POST
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddComment;

AddComment.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	setComments: PropTypes.func.isRequired,
	commentInput: PropTypes.object.isRequired,
};
