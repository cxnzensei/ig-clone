// eslint-disable-next-line no-unused-vars
import { func } from "prop-types";
import { firebase, FieldValue } from "../lib/firebase";

export async function doesUserNameExist(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((user) => user.data.length > 0);
}

export async function getUserByUserName(username) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
}

export async function getUserByUserId(userId) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get();

	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
}

export async function getSuggestedProfiles(userId, following) {
	const result = await firebase
		.firestore()
		.collection("users")
		.limit(10)
		.get();

	return result.docs
		.map((user) => ({
			...user.data(),
			docId: user.id,
		}))
		.filter(
			(profile) =>
				profile.userId !== userId && !following.includes(profile.userId)
		);
}

export async function updateLoggedInUserFollowing(
	loggedInUserDocId, // cxn doc ID
	profileId, // other user ID
	isFollowingProfile // true or false => following or not
) {
	return firebase
		.firestore()
		.collection("users")
		.doc(loggedInUserDocId)
		.update({
			following: isFollowingProfile
				? FieldValue.arrayRemove(profileId)
				: FieldValue.arrayUnion(profileId),
		});
}

export async function updateFollowedUserFollowers(
	profileDocId, // other user doc ID
	userId, // cxn ID
	isFollowingProfile
) {
	return firebase
		.firestore()
		.collection("users")
		.doc(profileDocId)
		.update({
			followers: isFollowingProfile
				? FieldValue.arrayRemove(userId)
				: FieldValue.arrayUnion(userId),
		});
}

export async function getPhotos(userId, following) {
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "in", following)
		.get();

	const resultSelf = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "==", userId)
		.get();

	const userFollowedPhotos = result.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const ownPhotos = resultSelf.docs.map((photo) => ({
		...photo.data(),
		docId: photo.id,
	}));

	const allPosts = userFollowedPhotos.concat(ownPhotos);

	const photosWithUserDetails = await Promise.all(
		allPosts.map(async (photo) => {
			let userLikedPhoto = false;
			if (photo.likes.includes(userId)) {
				userLikedPhoto = true;
			}
			const user = await getUserByUserId(photo.userId);
			const { username } = user[0];
			return { username, ...photo, userLikedPhoto };
		})
	);
	return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
	const [user] = await getUserByUserName(username);
	const result = await firebase
		.firestore()
		.collection("photos")
		.where("userId", "==", user.userId)
		.get();

	return result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
}

export async function isUserFollowingProfile(
	loggedInUserUsername,
	profileUserId
) {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", loggedInUserUsername)
		.where("following", "array-contains", profileUserId)
		.get();

	const [response = {}] = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return response.userId;
}

export async function toggleFollow(
	isFollowingProfile,
	activeUserDocId,
	profileDocId,
	profileUserId,
	followingUserId
) {
	// 1st - your doc Id
	// 2nd - other person's user Id
	// 3rd - do you follow em or not
	await updateLoggedInUserFollowing(
		activeUserDocId,
		profileUserId,
		isFollowingProfile
	);

	// 1st - your user Id
	// 2nd - other person's doc Id
	// 3rd - do you follow em or not
	await updateFollowedUserFollowers(
		profileDocId,
		followingUserId,
		isFollowingProfile
	);
}
