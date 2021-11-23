import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import useUser from "../hooks/use-user";
import * as ROUTES from "../constants/routes";
import { Link, useHistory } from "react-router-dom";
import {
	HomeIcon,
	LogoutIcon,
	PlusCircleIcon,
	HeartIcon,
} from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { modalPostState } from "../atoms/modalAtom";
import Skeleton from "react-loading-skeleton";

function Header() {
	const { firebase } = useContext(FirebaseContext);
	// eslint-disable-next-line no-unused-vars
	const [open, setOpen] = useRecoilState(modalPostState);
	const { user } = useContext(UserContext);
	const history = useHistory();
	const {
		user: { profilePhoto },
	} = useUser();

	return (
		<header className="h-16 bg-white border-b border-gray-primary mb-8 sticky top-0 z-50">
			<div className="container mx-auto max-w-screen-lg h-full">
				<div className="flex justify-between h-full mx-3">
					<div className="text-gray-700 text-center flex items-center cursor-pointer">
						<h1 className="flex justify-center w-full">
							<Link
								to={ROUTES.DASHBOARD}
								aria-label="Instagram logo"
							>
								<img
									src="/images/logo.png"
									alt="logo"
									className="object-contain mt-2 w-5/12 md:w-6/12"
								/>
							</Link>
						</h1>
					</div>
					<div className="text-gray-700 text-center flex items-center">
						{user ? (
							<>
								<Link
									to={ROUTES.DASHBOARD}
									aria-label="Dashboard"
								>
									<HomeIcon className="md:w-8 w-6 mr-4" />
								</Link>

								<Link to={ROUTES.SUGGESTIONS}>
									<HeartIcon className="w-6 mr-4 heart" />
								</Link>

								<PlusCircleIcon
									onClick={() => setOpen(true)}
									className="w-6 md:w-8 mr-4 cursor-pointer"
								/>

								<button
									type="button"
									title="Sign Out"
									onClick={() => {
										firebase.auth().signOut();
										history.push(ROUTES.LOGIN);
									}}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											firebase.auth().signOut();
										}
									}}
								>
									<LogoutIcon className="w-6 md:w-8 mr-4" />
								</button>
								<div className="flex items-center cursor-pointer">
									<Link to={`/p/${user.displayName}`}>
										{profilePhoto ? (
											<img
												className="rounded-full w-6 h-6 md:w-8 md:h-8 bg-gray-primary object-cover"
												src={profilePhoto}
												alt={`${user.displayName}`}
											/>
										) : (
											<Skeleton
												count={1}
												height={28}
												width={28}
												className="mb-1"
											/>
										)}
									</Link>
								</div>
							</>
						) : (
							<>
								<Link to={ROUTES.LOGIN}>
									<button
										className="bg-blue-medium mr-3 font-bold text-xs rounded text-white w-20 h-8"
										type="button"
									>
										Log In
									</button>
								</Link>
								<Link to={ROUTES.SIGN_UP}>
									<button
										className="bg-gray-primary font-bold text-xs rounded text-blue-medium w-20 h-8"
										type="button"
									>
										Sign Up
									</button>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
