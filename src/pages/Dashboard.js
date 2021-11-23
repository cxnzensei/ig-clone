import Header from "../components/Header";
import Sidebar from "../components/sidebar/index";
import Timeline from "../components/Timeline";

function Dashboard() {
	return (
		<div>
			<div className="bg-gray-background">
				<Header />
				<div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
					<Timeline />
					<Sidebar />
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
