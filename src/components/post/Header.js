import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { getUserByUserName } from "../../services/firebase";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

function Header({ username }) {
	const [profilePhoto, setProfilePhoto] = useState("");
	useEffect(() => {
		const profilePhotoByUsername = async () => {
			let user = await getUserByUserName(username);
			let profilePhoto = user[0].profilePhoto;
			setProfilePhoto(profilePhoto);
		};
		profilePhotoByUsername();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex border-b justify-between items-center border-gray-primary h-4 p-4 py-8">
			<div className="flex items-center">
				<Link to={`/p/${username}`} className="flex items-center">
					{profilePhoto ? (
						<img
							alt={username}
							src={profilePhoto}
							className="rounded-full object-cover w-10 h-10 flex mr-3 bg-gray-primary"
						/>
					) : (
						<Skeleton
							count={1}
							height={30}
							width={30}
							className="mr-3"
						/>
					)}
					<p className="font-semibold">{username}</p>
				</Link>
			</div>
			<DotsHorizontalIcon className="btn h-5 w-5 cursor-pointer" />
		</div>
	);
}

export default Header;

Header.propTypes = {
	username: PropTypes.string.isRequired,
};
