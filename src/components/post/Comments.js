import { useState } from "react";
import PropTypes from "prop-types";
import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

function Comments({ docId, comments: allComments, posted, commentInput }) {
	const [comments, setComments] = useState(allComments);
	return (
		<>
			{comments.length > 0 && (
				<div className="p-4 pt-0 -mt-2 pb-4">
					<p className="text-gray-base">Comments</p>
					<div className="bg-gray-primary py-3 my-2 rounded-md">
						<div className="overflow-y-scroll h-20 break-words mx-2 scrollbar_hide">
							{comments.map((item) => (
								<div
									key={`${item.comment}-${item.displayName}`}
									className="mb-1"
								>
									<Link to={`/p/${item.displayName}`}>
										<span className="mr-1 font-semibold text-sm">
											{item.displayName}
										</span>
									</Link>
									<span className="text-sm">
										{item.comment}
									</span>
									<p className="text-xs text-gray-base">
										{formatDistance(
											item.timeStamp,
											Date.now()
										)}{" "}
										ago
									</p>
								</div>
							))}
						</div>
					</div>
					<p className="text-gray-base uppercase text-xs mt-2">
						{formatDistance(posted, Date.now())} AGO
					</p>
				</div>
			)}
			<AddComment
				docId={docId}
				comments={comments}
				setComments={setComments}
				commentInput={commentInput}
			/>
		</>
	);
}

export default Comments;

Comments.propTypes = {
	docId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired,
	posted: PropTypes.number.isRequired,
	commentInput: PropTypes.object.isRequired,
};
