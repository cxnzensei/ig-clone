import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import { useRecoilState } from "recoil";
import { modalProfilePhotoState } from "../../atoms/modalAtom";

function Header({
	photosCount,
	followerCount,
	setFollowerCount,
	profile: {
		docId: profileDocId,
		userId: profileUserId,
		username: profileUserName,
		profilePhoto,
		followers = [],
		loggedInUsername,
		fullName,
		following = [],
	},
}) {
	const { user } = useUser();
	console.log(profileUserId, user.userId);
	// eslint-disable-next-line no-unused-vars
	const [open, setOpen] = useRecoilState(modalProfilePhotoState);
	const [isFollowingProfile, setIsFollowingProfile] = useState();
	const activeBtnFollow = user.username && user.username !== profileUserName;

	const handleToggleFollow = async () => {
		setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
		setFollowerCount({
			followerCount: isFollowingProfile
				? followerCount - 1
				: followerCount + 1,
		});
		await toggleFollow(
			isFollowingProfile,
			user.docId,
			profileDocId,
			profileUserId,
			user.userId
		);
	};

	useEffect(() => {
		const isLoggedInUserFollowingProfile = async () => {
			const isFollowing = await isUserFollowingProfile(
				user.username,
				profileUserId
			);
			setIsFollowingProfile(!!isFollowing);
		};
		if (user.username && profileUserId) {
			isLoggedInUserFollowingProfile();
		}
	}, [user.username, profileUserId]);

	return (
		<>
			<div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
				<div className="container flex justify-center">
					{user.username &&
						(profilePhoto === "" ? (
							<img
								className="rounded-full border cursor-pointer p-1 object-cover border-gray-primary flex w-28 h-28 md:w-40 md:h-40"
								src="/images/default.png"
								onClick={() =>
									user.userId === profileUserId &&
									setOpen(true)
								}
								alt={`${user.displayName}`}
							/>
						) : (
							<img
								src={profilePhoto}
								alt={profileUserName}
								onClick={() =>
									user.userId === profileUserId &&
									setOpen(true)
								}
								className="rounded-full border cursor-pointer p-1 object-cover border-gray-primary flex w-28 h-28 md:w-40 md:h-40"
							/>
						))}
				</div>
				<div className="flex items-center justify-center flex-col col-span-2">
					<div className="container flex items-center">
						<p className="text-2xl mr-4">
							{!profileUserName ? (
								<Skeleton count={1} height={24} />
							) : (
								profileUserName
							)}
						</p>
						{activeBtnFollow && (
							<button
								type="button"
								onClick={handleToggleFollow}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										handleToggleFollow();
									}
								}}
								className="bg-blue-medium font-semibold text-xs rounded text-white w-20 h-8"
							>
								{isFollowingProfile ? "Unfollow" : "Follow"}
							</button>
						)}
					</div>
					<div className="container mt-4">
						<p className="font-medium">
							{!fullName ? (
								<Skeleton count={1} height={24} />
							) : (
								fullName
							)}
						</p>
					</div>
				</div>
			</div>
			<div className="mt-8">
				<div className="flex justify-around border border-l-0 border-r-0 p-4 border-gray-primary">
					{followers === undefined || following === undefined ? (
						<Skeleton count={1} width={677} height={24} />
					) : (
						<>
							<p className="text-xs md:text-base">
								<span className="font-semibold">
									{photosCount} {` `}
									{photosCount === 1 ? `post` : `posts`}
								</span>
							</p>
							<p className="text-xs md:text-base">
								<span className="font-semibold">
									{followerCount}
									{` `}
									{followerCount === 1
										? `follower`
										: `followers`}
								</span>
							</p>
							<p className="text-xs md:text-base">
								<span className="font-semibold">
									{following.length} {` following`}
								</span>
							</p>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Header;

Header.propTypes = {
	photosCount: PropTypes.number.isRequired,
	followerCount: PropTypes.number.isRequired,
	setFollowerCount: PropTypes.func.isRequired,
	profile: PropTypes.shape({
		docId: PropTypes.string,
		userId: PropTypes.string,
		username: PropTypes.string,
		fullName: PropTypes.string,
		following: PropTypes.array,
		followers: PropTypes.array,
	}).isRequired,
};
