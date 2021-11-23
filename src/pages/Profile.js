import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUserName } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/profile";
import ModalProfilePhoto from "../components/ModalProfilePhoto";

function Profile() {
	const { username } = useParams();
	const [user, setUser] = useState(null);
	const history = useHistory();

	useEffect(() => {
		async function checkUserExists() {
			const [user] = await getUserByUserName(username);
			if (user?.userId) {
				setUser(user);
			} else {
				history.push(ROUTES.NOT_FOUND);
			}
		}
		checkUserExists();
	}, [username, history]);

	return user?.username ? (
		<div className="bg-gray-background">
			<Header />
			<div className="mx-auto max-w-screen-lg">
				<UserProfile user={user} />
			</div>
			<ModalProfilePhoto />
		</div>
	) : null;
}

export default Profile;
