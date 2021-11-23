import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
	updateLoggedInUserFollowing,
	updateFollowedUserFollowers,
} from "../../services/firebase";

function SuggestedProfile({
	profileDocId,
	username,
	profileId,
	profilePhoto,
	userId,
	loggedInUserDocId,
}) {
	const [followed, setFollowed] = useState(false);

	async function handleFollowUser() {
		setFollowed(true);
		await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
		await updateFollowedUserFollowers(profileDocId, userId, false);
	}

	return !followed ? (
		<div className="flex items-center justify-between">
			<div className="flex items-center justify-between">
				{profilePhoto === "" ? (
					<img
						className="rounded-full w-14 h-14 object-cover mr-3"
						src="/images/default.png"
						alt={`${username}`}
					/>
				) : (
					<img
						className="rounded-full w-14 h-14 object-cover mr-3"
						src={profilePhoto}
						alt={username}
					/>
				)}
				<div>
					<Link to={`/p/${username}`}>
						<p className="text-sm">{username}</p>
					</Link>
					<button
						onClick={handleFollowUser}
						className="text-xs font-bold text-blue-medium"
					>
						Follow
					</button>
				</div>
			</div>
		</div>
	) : null;
}

export default SuggestedProfile;

SuggestedProfile.propTypes = {
	profileDocId: PropTypes.string,
	username: PropTypes.string,
	profileId: PropTypes.string,
	userId: PropTypes.string,
	loggedInUserDocId: PropTypes.string,
	profilePhoto: PropTypes.string,
};
