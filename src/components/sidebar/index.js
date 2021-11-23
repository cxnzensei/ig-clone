import useUser from "../../hooks/use-user";
import User from "./User";
import Suggestions from "./Suggestions";

function Sidebar() {
	const {
		user: { docId, fullName, username, userId, following, profilePhoto },
	} = useUser();
	return (
		<div className="md:col-span-1 sideBar">
			<div className="mr-3 mt-1 fixed">
				<User
					username={username}
					fullName={fullName}
					profilePhoto={profilePhoto}
				/>
				<Suggestions
					userId={userId}
					following={following}
					loggedInUserDocId={docId}
				/>
			</div>
		</div>
	);
}

export default Sidebar;
