import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import {
	BookmarkIcon,
	HeartIcon,
	ChatIcon,
	PaperAirplaneIcon,
} from "@heroicons/react/outline";
import Image from "./Image";

function Actions({ docId, totalLikes, likedPhoto, handleFocus, imageSrc }) {
	const {
		user: { uid: userId = "" },
	} = useContext(UserContext);

	const [toggleLiked, setToggleLiked] = useState(likedPhoto);
	const [toggleSaved, setToggleSaved] = useState(false);
	const [likes, setLikes] = useState(totalLikes);
	const { firebase, FieldValue } = useContext(FirebaseContext);

	const handleToggleLiked = async () => {
		setToggleLiked((toggleLiked) => !toggleLiked);

		await firebase
			.firestore()
			.collection("photos")
			.doc(docId)
			.update({
				likes: toggleLiked
					? FieldValue.arrayRemove(userId)
					: FieldValue.arrayUnion(userId),
			});

		setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
	};

	const handleToggleSaved = async () => {
		setToggleSaved((toggleSaved) => !toggleSaved);
	};

	return (
		<>
			<div onDoubleClick={handleToggleLiked}>
				<Image docId={docId} imageSrc={imageSrc} />
			</div>
			<div className="flex justify-between p-4">
				<div className="flex gap-3">
					<HeartIcon
						onClick={handleToggleLiked}
						className={`w-7 h-7 cursor-pointer ${
							toggleLiked
								? "fill-red text-red-primary"
								: "text-black-light"
						}`}
					/>
					<ChatIcon
						onClick={handleFocus}
						onKeyDown={(event) => {
							if (event.key === "Enter") {
								handleFocus();
							}
						}}
						className="w-7 h-7 cursor-pointer"
					/>
					<PaperAirplaneIcon className="h-7 w-7 transform rotate-45 pb-1 cursor-pointer" />
				</div>
				<div>
					<BookmarkIcon
						onClick={handleToggleSaved}
						className={`w-7 h-7 ${
							toggleSaved ? "fill-black" : "text-black-light"
						} cursor-pointer`}
					/>
				</div>
			</div>
			<div className="p-4 py-0">
				<p className="font-semibold">
					{likes === 1 ? `${likes} like` : `${likes} likes`}
				</p>
			</div>
		</>
	);
}

export default Actions;

Actions.propTypes = {
	docId: PropTypes.string.isRequired,
	totalLikes: PropTypes.number.isRequired,
	likedPhoto: PropTypes.bool.isRequired,
	handleFocus: PropTypes.func.isRequired,
	imageSrc: PropTypes.string.isRequired,
};
