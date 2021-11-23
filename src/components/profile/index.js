import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Photos from "./Photos";
import { getUserPhotosByUsername } from "../../services/firebase";

function UserProfile({ user }) {
	const reducer = (state, newState) => ({ ...state, ...newState });
	const initialState = {
		profile: {},
		photosCollection: [],
		followerCount: 0,
	};
	const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
		reducer,
		initialState
	);
	useEffect(() => {
		async function getProfileInfoAndPhotos() {
			const photos = getUserPhotosByUsername(user.username);
			dispatch({
				profile: await user,
				photosCollection: await photos,
				followerCount: user.followers.length,
			});
		}
		getProfileInfoAndPhotos();
	}, [user]);

	return (
		<div className="mx-3">
			<Header
				photosCount={photosCollection ? photosCollection.length : 0}
				profile={profile}
				followerCount={followerCount}
				setFollowerCount={dispatch}
			/>
			<Photos photos={photosCollection} />
		</div>
	);
}

export default UserProfile;

UserProfile.propTypes = {
	user: PropTypes.shape({
		dateCreated: PropTypes.number.isRequired,
		emailAddress: PropTypes.string.isRequired,
		followers: PropTypes.array.isRequired,
		following: PropTypes.array.isRequired,
		fullName: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
};
