import Header from "../components/Header";
import Suggestions from "../components/sidebar/Suggestions";
import User from "../components/sidebar/User";
import useUser from "../hooks/use-user";

function SuggestionPage() {
	const {
		user: { fullName, username, userId, following },
	} = useUser();
	return (
		<div>
			<Header />
			<div className="mx-3">
				<div className="md:grid grid-cols-2 gap-4 justify-between mx-auto max-w-screen-lg">
					<div className="bg-gray-primary p-7 rounded-md">
						<User username={username} fullName={fullName} />
						<Suggestions userId={userId} following={following} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SuggestionPage;
