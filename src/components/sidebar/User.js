import { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const User = ({ username, fullName, profilePhoto }) =>
	!username || !fullName ? (
		<Skeleton count={1} height={61} />
	) : (
		<Link
			to={`/p/${username}`}
			className="grid grid-cols-3 gap-4 mb-6 items-center"
		>
			<div className="flex items-center justify-between col-span-1">
				{profilePhoto === "" ? (
					<img
						className="rounded-full w-14 h-14 object-cover"
						src="/images/default.png"
						alt={`${username}`}
					/>
				) : (
					<img
						src={profilePhoto}
						alt="someBug"
						className="rounded-full w-14 h-14 object-cover"
					/>
				)}
			</div>
			<div className="col-span-2">
				<p className="font-bold text-sm">{username}</p>
				<p className="text-sm">{fullName}</p>
			</div>
		</Link>
	);

export default memo(User);

User.propTypes = {
	username: PropTypes.string,
	fullName: PropTypes.string,
	profilePhoto: PropTypes.string,
};
