import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUserNameExist } from "../services/firebase";

function Signup() {
	const history = useHistory();
	const { firebase } = useContext(FirebaseContext);

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const isInvalid = password === "" || emailAddress === "";

	const handleSignUp = async (event) => {
		event.preventDefault();
		const usernameExists = await doesUserNameExist(username);
		if (!usernameExists.length) {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				await createdUserResult.user.updateProfile({
					displayName: username,
				});

				await firebase.firestore().collection("users").add({
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					following: [],
					followers: [],
					dateCreated: Date.now(),
					profilePhoto: "",
				});

				history.push(ROUTES.DASHBOARD);
			} catch (error) {
				setFullName("");
				setEmailAddress("");
				setPassword("");
				setUsername("");
				setError(error.message.slice(9, -1) + `, Try again`);
			}
		} else {
			setError("The username is already taken, please try another");
		}
	};

	useEffect(() => {
		document.title = `Sign Up • Instagram`;
	}, []);

	return (
		<div className="container flex mx-auto max-w-screen-md lg:items-center justify-center sm:h-screen">
			<div className="flex lg:w-3/5">
				<img
					className="hidden max-w-full lg:inline-grid"
					src="./images/iphone.jpg"
					alt="iphone"
				/>
			</div>
			<div className="flex flex-col md:w-2/5 sm: w-72 sm: mt-40 lg: mb-40">
				<div className="flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4">
					<h1 className="flex justify-center w-full mb-3">
						<img
							src="./images/logo.png"
							alt="logo"
							className="mt-2 w-6/12"
						/>
					</h1>
					<p className="text-gray-base text-center font-semibold mb-5">
						Sign up to see photos and videos from your friends.
					</p>
					{error && (
						<p className="mb-4 text-xs text-red-primary">{error}</p>
					)}

					<form onSubmit={handleSignUp} method="POST">
						<input
							type="text"
							value={emailAddress}
							aria-label="Enter your Email Address"
							placeholder="Email Address"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
							onChange={({ target }) =>
								setEmailAddress(target.value)
							}
						/>
						<input
							value={fullName}
							type="text"
							aria-label="Enter you Full Name"
							placeholder="Full Name"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
							onChange={({ target }) => setFullName(target.value)}
						/>
						<input
							value={username}
							type="text"
							aria-label="Enter you Username"
							placeholder="Username"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
							onChange={({ target }) => setUsername(target.value)}
						/>
						<input
							type="Password"
							value={password}
							aria-label="Enter your Password"
							placeholder="Password"
							className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary outline-none rounded mb-2"
							onChange={({ target }) => setPassword(target.value)}
						/>

						<button
							disabled={isInvalid}
							className={`bg-blue-medium text-white w-full rounded h-8 font-bold
							${isInvalid && "opacity-50"}`}
							type="submit"
						>
							Sign Up
						</button>
					</form>
				</div>
				<div className="flex justify-center items-center flex-col w-full rounded bg-white p-4 border border-gray-primary">
					<p className="text-sm">
						Have an account?{" "}
						<Link
							to={ROUTES.LOGIN}
							className="font-bold text-blue-medium"
						>
							Log in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
